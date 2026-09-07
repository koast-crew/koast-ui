# Figma REST API → 토큰 파이프라인 설계

- **날짜**: 2026-09-07
- **범위**: 설계만. 구현/설치 없음
- **선행 문서**: [2026-09-04-color-token-setup.md](./2026-09-04-color-token-setup.md)
- **대상 토큰**: spacing(padding/gap), radius, border-width, size, typography(font-size/line-height/weight)

---

## 1. 왜 MCP 대신 스크립트인가

MCP(공식 Figma Dev Mode / 원격 서버)를 먼저 검토했고, 이 저장소에는 맞지 않는다고 판단했습니다.

| 항목 | MCP | REST + 스크립트 |
| :-- | :-- | :-- |
| 출력 성격 | prescriptive — `leading-[22.126px]`, `text-[color:var(--neutral/dark-100%,black)]` 같은 임의값 코드를 뱉음 | 값만 가져오고 이름·단위·반올림은 우리가 정함 |
| 재현성 | 매번 LLM이 프레임을 다시 읽음. 같은 입력에 같은 출력 보장 없음 | 순수 함수. 같은 파일 → 같은 CSV |
| 기존 자산과의 관계 | `tokens.generated.*` 를 우회함 | `generate-tokens.mjs` 를 그대로 재사용 |
| CI 편입 | 불가 | `--check` 로 drift 검출 가능 |

특히 첫 줄이 결정적입니다. 이 저장소는 [선행 문서 §3](./2026-09-04-color-token-setup.md)에서 **"raw 팔레트는 여기에 들어올 수 없다"** 는 경계를 세워두었습니다. MCP가 뱉는 임의값은 그 경계를 정확히 무너뜨리는 형태입니다.

---

## 2. 설계 원칙

선행 작업에서 이미 자리잡은 구조를 깨지 않는 것이 최우선입니다.

### 2.1 CSV는 계속 단일 원본이다 — Figma가 원본이 되는 게 아니다

가장 중요한 결정입니다. 파이프라인을 `Figma → 생성물` 로 직결하지 **않습니다**.

```
Figma  ──figma:pull──▶  CSV  ──npm run tokens──▶  생성물
                        ▲
                   사람이 git diff 로 검토하는 지점
```

이유는 선행 문서 §2에 있습니다. CSV를 피그마와 손으로 대조해 10건을 고쳤고, 그중 `bg/warning-bold` 는 **명도 방향이 반대로 뒤집힌** 변경이었습니다. 자동 반영이었다면 조용히 통과했을 변경입니다. CSV가 git에 남는 텍스트라서 잡힌 것이므로, 그 검토 지점을 없애면 안 됩니다.

스크립트가 하는 일은 "대조를 자동화"하는 것이지 "검토를 없애는" 것이 아닙니다.

### 2.2 네트워크는 `prebuild` 에 들어가지 않는다

현재 `prebuild: npm run tokens` 가 모든 빌드에서 돕니다. 여기에 네트워크 호출이 끼면 빌드가 Figma 가용성·PAT 만료·rate limit에 종속됩니다.

- `npm run tokens` — **오프라인·결정론적 유지**. 변경 없음
- `npm run figma:pull` — 사람이 명시적으로 실행. 네트워크는 여기서만

### 2.3 spacing/typography는 CSS 변수로 만들지 않는다

색상은 light/dark 모드 전환과 brand 주입 때문에 CSS 변수가 **필요했습니다**. spacing에는 그 두 가지가 다 없습니다.

CSS 변수로 내보내면 소비자가 `--koast-space-md` 를 덮어쓸 수 있게 되는데, 이는 선행 문서 §3의 잠금 경계(*"시맨틱 토큰 74개 → 리터럴 값으로 고정, 덮어쓸 통로 없음"*)와 정면으로 어긋납니다.

→ **spacing/radius/typography는 Tailwind theme에 리터럴로만 등록합니다.** `tokens.generated.css` 는 색상 전용으로 남습니다.

### 2.4 `fontFamily` 는 토큰화하지 않는다

`base.css` 는 preflight를 걷어내면서 **의도적으로 font-family를 지정하지 않았습니다**. 라이브러리가 소비자 앱의 타이포그래피를 갈아엎지 않기 위해서입니다.

Figma에서 fontFamily를 읽어오더라도 **메타데이터로만 기록**하고 Tailwind theme에는 넣지 않습니다. font-size / line-height / weight만 토큰화합니다.

---

## 3. Figma에서 무엇을 어떻게 읽는가

### 3.1 엔드포인트

| 목적 | 엔드포인트 | 플랜 제약 |
| :-- | :-- | :-- |
| 노드 속성 (padding, gap, size, radius) | `GET /v1/files/:key/nodes?ids=…&depth=…` | **없음** |
| 텍스트 스타일 이름 | 위 응답의 최상위 `styles` 맵 | **없음** |
| ~~변수 정의 + 모드별 값~~ | ~~`GET /v1/files/:key/variables/local`~~ | ❌ **사용 불가** (아래 3.3) |

인증은 `X-Figma-Token: <PAT>` 헤더입니다.

### 3.2 노드에서 뽑는 필드

**FRAME / COMPONENT (`layoutMode !== 'NONE'`)**

```
paddingLeft / paddingRight / paddingTop / paddingBottom
itemSpacing                       → gap
absoluteBoundingBox.{width,height}
cornerRadius | rectangleCornerRadii
strokeWeight
boundVariables                    → 바인딩된 변수 ID (아래 3.3 참고)
```

**TEXT**

```
style.fontSize / fontWeight / letterSpacing
style.lineHeightPx | lineHeightPercent | lineHeightUnit
style.fontFamily                  → 메타데이터로만 기록 (§2.4)
styles.text                       → styleId, 최상위 styles 맵에서 이름 조회
```

### 3.3 이름 문제 — typography와 spacing의 비대칭

여기가 설계에서 가장 조심할 부분입니다.

**typography는 이름이 공짜로 나옵니다.** Figma에 공유 텍스트 스타일이 등록돼 있으면 노드의 `styles.text` → 파일 응답의 `styles` 맵에서 `heading/lg` 같은 **사람이 지은 이름**을 얻습니다. Enterprise 불필요.

**spacing은 그렇지 않습니다.** Figma에는 "spacing 스타일" 개념이 없고 변수뿐입니다. 노드의 `boundVariables` 는 불투명한 변수 ID만 주고, ID→이름 조회는 Variables API(Enterprise)가 필요합니다.

Enterprise가 아니라면 REST 로는 **숫자만 나오고 이름이 안 나옵니다** (`16`은 얻지만 `space/md`는 못 얻음).

**2026-09-07 확인: 이 계정은 Enterprise가 아닙니다.** PAT 발급 화면의 스코프 목록에 Variables 항목이 아예 없으며,
해당 스코프는 Enterprise 조직에서만 노출됩니다. Variables **REST** API 는 재발급해도 열리지 않습니다.

**대신 Plugin API 를 씁니다.** Enterprise 제약은 REST 에만 걸리고, `figma.variables.getLocalVariablesAsync()` 는
모든 플랜에서 동작합니다. 커뮤니티 플러그인(`variables2json`, `TokensBrücke`, `Export Variables to JSON` 등)으로
변수를 JSON 으로 export 해 **저장소에 커밋**하고, 스크립트는 그 JSON 을 읽습니다.

| 방안 | 얻는 것 | 비용 |
| :-- | :-- | :-- |
| **플러그인 export (권장)** | 실제 변수 이름·값·모드 전부 | 변수 변경 시 export 1회 |
| ~~스펙 프레임~~ | 프레임 이름 = 토큰명 | 디자이너가 페이지 제작 + 유지보수 |
| ~~Variables REST API~~ | — | ❌ Enterprise 전용, 사용 불가 |

플러그인 export 가 §2.1 과도 더 잘 맞습니다. 커밋된 JSON 의 git diff 가 그대로 사람이 검토하는 지점이 되고,
스크립트가 네트워크 대신 로컬 JSON 을 읽으므로 §2.2(빌드에 네트워크 금지)도 자동으로 지켜집니다.

```
Figma ──플러그인 export──▶ figma-variables.json ──▶ CSV ──npm run tokens──▶ 생성물
                          (저장소 커밋, diff 검토)
```

타이포그래피는 이 경로가 필요 없습니다. REST 로 텍스트 스타일 이름이 그대로 나옵니다.

---

## 4. 파이프라인 구조

```
                      FIGMA_TOKEN (.env, 이미 gitignore됨)
                              │
        figma.config.json ────┼──── npm run figma:pull
                              ▼
                  scripts/figma-pull.mjs
                              │
                   .figma-cache/*.json  (gitignore 추가 필요)
                              │
                   ┌──────────┴──────────┐
                   ▼                     ▼
    semantic-dimension-tokens.csv   semantic-typography-tokens.csv
                   │                     │
                   └──────────┬──────────┘
                              │  ← 여기서 사람이 git diff 검토
                              ▼
                  npm run tokens (기존, 확장)
                              │
                   ┌──────────┴──────────┐
                   ▼                     ▼
    tokens/tailwind.generated.js   tokens/tokens.generated.ts
                   │                     │
                   ▼                     ▼
           tailwind.config.js      Storybook 문서
```

`semantic-color-tokens.csv` 와 `tokens.generated.css` 는 이 흐름에 그대로 병렬로 존재합니다.

---

## 5. 파일 설계

### 5.1 `figma.config.json` (신규, 커밋함)

```json
{
  "fileKey": "…",
  "specPage": "🎛 Tokens",
  "nodes": {
    "dimension": "1:234",
    "typography": "1:567"
  },
  "remBase": 16,
  "grid": { "space": 2, "radius": 2, "size": 4 },
  "namePattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$"
}
```

PAT은 여기 넣지 않습니다. `FIGMA_TOKEN` 환경변수(`.env`)로만 읽습니다. `.env` 는 이미 `.gitignore` 에 있습니다.

### 5.2 `semantic-dimension-tokens.csv` (신규)

기존 색상 CSV와 같은 납작한 형태를 유지합니다. 모드가 없으므로 `light`/`dark` 대신 단일 `value`, 그리고 추적용 `source` 컬럼을 둡니다.

```csv
category,token,value,source
dimension/space,0,0,{space/0}
dimension/space,1,4,{space/1}
dimension/space,2,8,{space/2}
dimension/space,3,12,{space/3}
dimension/radius,sm,4,{radius/sm}
dimension/radius,md,6,{radius/md}
dimension/border,thin,1,{border/thin}
dimension/size,control-md,40,{size/control/md}
```

`value` 단위는 **px**입니다. rem 변환은 생성기가 담당합니다 (§6.2).

### 5.3 `semantic-typography-tokens.csv` (신규)

```csv
category,token,fontSize,lineHeight,fontWeight,letterSpacing,fontFamily
type/label,xs,12,16,600,0,Pretendard
type/label,sm,14,20,600,0,Pretendard
type/body,md,16,24,400,0,Pretendard
type/heading,lg,20,28,700,-0.2,Pretendard
```

`fontFamily` 는 §2.4에 따라 **기록만 하고 생성물에는 반영하지 않습니다**. CSV에 남기는 이유는 디자인 쪽 폰트 변경을 diff로 감지하기 위해서입니다.

### 5.4 `scripts/figma-pull.mjs` (신규)

```js
// ── 네트워크
figmaFetch(path)                  // X-Figma-Token, 429 지수 백오프, 403 명시적 에러
loadNodes(fileKey, ids)           // .figma-cache/ 에 저장. --offline 이면 캐시만 사용

// ── 추출
walk(node, visit)                 // DFS
collectStyleNames(payload)        // styleId → name 맵 (최상위 styles)
extractDimensions(specRoot)       // 프레임 이름 → { category, token, value }
extractTypography(root, styleMap) // TEXT 노드 + 스타일명 → 행

// ── 검증  ★ 핵심
assertGrid(rows, grid)            // 22.126 같은 값을 여기서 막는다
assertNaming(rows, pattern)       // 오타·대문자·공백 차단
assertNoDuplicate(rows)

// ── 출력
writeCsv(path, rows)              // category → token 안정 정렬 (diff 안정성)
diffAgainstExisting(path, rows)   // --check 모드: 표로 출력 후 exit 1
```

### 5.5 `package.json` 스크립트

```diff
  "tokens": "node scripts/generate-tokens.mjs",
+ "figma:pull": "node scripts/figma-pull.mjs",
+ "figma:check": "node scripts/figma-pull.mjs --check",
  "prebuild": "npm run tokens"
```

`prebuild` 는 건드리지 않습니다 (§2.2).

### 5.6 `.gitignore` 추가

```
.figma-cache/
```

---

## 6. `generate-tokens.mjs` 확장

기존 구조(CSV 파싱 → 카테고리 매핑 → 스케일 빌드 → 파일 3개 출력)를 그대로 따릅니다.

### 6.1 카테고리 매핑 테이블 추가

```js
const DIMENSION_CATEGORIES = {
  'dimension/space':  { scale: 'spacing',      unit: 'rem' },
  'dimension/radius': { scale: 'borderRadius', unit: 'rem' },
  'dimension/border': { scale: 'borderWidth',  unit: 'px'  },
  'dimension/size':   { scale: 'spacing',      unit: 'rem', prefix: 'control' },
};
```

### 6.2 단위 정책

| 대상 | 단위 | 근거 |
| :-- | :-- | :-- |
| space / size / radius / font-size / line-height | **rem** (÷ `remBase`) | Tailwind 기본 스케일이 rem 기반이라 기존 `px-4`(=1rem)와 눈금이 맞습니다. 사용자 폰트 크기 설정도 존중됩니다 |
| border-width | **px** | 1px 경계는 확대되면 안 됩니다 |
| letter-spacing | **em** | 폰트 크기에 비례해야 합니다 |

`0` 은 단위 없이 `'0'` 으로 출력합니다.

### 6.3 생성물 추가

`tailwind.generated.js` 에 export 4개가 늘어납니다.

```js
export const koastSpacing     = { 'koast-1': '0.25rem', 'koast-2': '0.5rem', … };
export const koastBorderRadius= { 'koast-sm': '0.25rem', … };
export const koastBorderWidth = { 'koast-thin': '1px', … };
export const koastFontSize    = {
  'koast-body-md': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0', fontWeight: '400' }],
  …
};
```

Tailwind의 `fontSize` 튜플 형식을 쓰면 **`text-koast-body-md` 클래스 하나가 크기·행간·자간·굵기를 한꺼번에 적용**합니다. 셋을 따로 붙이다 어긋나는 사고를 구조적으로 막습니다.

`tokens.generated.ts` 에는 Storybook 문서용 메타데이터 배열을 색상과 같은 형태로 추가합니다.

### 6.4 `tailwind.config.js`

```diff
  theme: {
    extend: {
      textColor: { koast: { ...koastTextColor, ...koastMediaColor } },
      …
+     spacing: koastSpacing,
+     borderRadius: koastBorderRadius,
+     borderWidth: koastBorderWidth,
+     fontSize: koastFontSize,
    },
  },
```

`extend` 이므로 Tailwind 기본 스케일은 유지되고, 키에 `koast-` 접두사가 있어 충돌하지 않습니다. 색상의 `bg-koast-*` 와 명명 규칙이 일치합니다.

```
p-koast-3          space/3
gap-koast-2        space/2
rounded-koast-md   radius/md
border-koast-thin  border/thin
text-koast-body-md type/body/md
```

---

## 7. 적용 예 — `Button.styles.tsx`

현재 하드코딩:

```ts
const SIZES: Record<ButtonSize, string> = {
  xs: 'text-xs px-2 py-1 gap-1',
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-base px-4 py-2 gap-2',
  …
};
```

토큰 적용 후:

```ts
const SIZES: Record<ButtonSize, string> = {
  xs: 'text-koast-label-xs px-koast-2 py-koast-1 gap-koast-1',
  sm: 'text-koast-label-sm px-koast-3 py-koast-1-5 gap-koast-1-5',
  md: 'text-koast-label-md px-koast-4 py-koast-2 gap-koast-2',
  …
};
```

그리고 `rounded` → `rounded-koast-md` 로 바뀝니다.

색상 때 세운 원칙(*"raw 팔레트는 들어올 수 없다"*)이 치수에도 동일하게 적용됩니다. `px-[13px]` 같은 임의값은 리뷰에서 거를 대상이 됩니다.

---

## 8. 실패 모드와 대응

| 상황 | 증상 | 설계된 대응 |
| :-- | :-- | :-- |
| **그리드 벗어난 값** | Figma에 `line-height: 22.126px` | `assertGrid` 에서 **실패**. 임의값을 CSV에 절대 쓰지 않음. "22.126 → 22 또는 24로 정리해 주세요" 메시지 |
| **이름 오타** | 선행 문서 §2가 지적한 실제 사례: `info-sublte`, `success-sublte` | `assertNaming` + 카테고리별 토큰 allowlist. 새 이름은 사람이 승인해야 통과 |
| PAT 만료/권한 부족 | 403 | 원인별 메시지. 캐시로 폴백하지 않음(조용한 구버전 사용 방지) |
| rate limit | 429 | 지수 백오프 후 재시도, 최종 실패 시 `--offline` 안내 |
| 노드 삭제/이름 변경 | 토큰이 사라짐 | `--check` 가 "사라진 토큰"으로 **보고만** 함. CSV에서 자동 삭제하지 않음 |
| Figma 값 회귀 | 명도 뒤집힘 같은 의심스러운 변경 | CSV git diff + PR 리뷰. §2.1이 이걸 위해 존재 |

`figma:check` 를 CI에 걸면 선행 문서 §2의 수작업 대조가 자동화됩니다. **drift가 있으면 빌드가 아니라 별도 잡이 실패**하게 두는 걸 권합니다 — Figma 변경이 배포를 막으면 안 됩니다.

---

## 9. 도입 순서

### Phase 0 — 색상으로 스크립트를 검증한다 (구현 전 필수)

**이미 손으로 검증된 74행 CSV가 있다는 게 큰 자산입니다.**

`figma-pull.mjs` 를 먼저 색상에 대해 `--dry-run` 으로 돌려서, 기존 `semantic-color-tokens.csv` 를 **그대로 재현하는지** 확인합니다. 재현되면 추출 로직이 맞다는 뜻이고, 어긋나면 그 차이가 곧 실제 drift이거나 스크립트 버그입니다. 어느 쪽이든 이득입니다.

이 단계를 건너뛰면 치수 토큰에서 틀렸을 때 대조군이 없습니다.

### Phase 1 — typography

이름이 공짜로 나오므로(§3.3) 가장 마찰이 적습니다. 플랜 제약도 없습니다.

### Phase 2 — dimension

스펙 프레임(§3.3 방안 A)이 준비돼야 합니다. 디자이너 협의 필요.

### Phase 3 — Button 마이그레이션 + CI `figma:check`

단, 선행 문서 §6이 지적한 대로 **이 저장소에는 테스트가 0개이고 `vitest` 가 설치조차 안 돼 있습니다.** 치수 변경은 색상 변경보다 시각 회귀가 눈에 덜 띕니다. Phase 3 전에 최소한 Storybook 스냅샷이라도 확보하는 편이 안전합니다.

---

## 10. 확인이 필요한 사항

착수 전에 답이 필요합니다. 전부 설계의 분기점입니다.

1. ~~Figma 플랜이 Enterprise인가?~~ → **해결 (2026-09-07).** Enterprise 아님. Plugin API export 로 갑니다 (§3.3).
2. ~~Figma에 공유 텍스트 스타일이 등록돼 있는가?~~ → **해결.** 16종 정식 등록 확인 (Heading 7 + Body 9).
3. **spacing이 Figma에서 변수로 정의돼 있는가?** `💈 Appearance` 페이지의 문서 테이블에 `spacing/*`, `border/radius/*`, `border/width/*` 가 `unit/*` 을 참조하는 형태로 적혀 있어 변수 존재 가능성이 높습니다. 플러그인 export 결과로 확정됩니다.
4. **`remBase` 를 16으로 확정해도 되는가?** 소비자 앱이 `html { font-size }` 를 건드릴 가능성.
5. **Button의 현재 크기(`px-4 py-2` 등)가 Figma와 일치하는가?** 불일치면 Phase 3은 단순 치환이 아니라 **디자인 변경**이 됩니다. 이건 릴리스 노트가 필요한 사안입니다.

---

## 11. 이 설계가 하지 않는 것

- **컴포넌트 코드 생성.** Figma 프레임을 React로 바꾸지 않습니다. 토큰 값만 가져옵니다.
- **Figma 쓰기.** 단방향입니다. 코드 → Figma 반영은 범위 밖입니다.
- **색상 파이프라인 대체.** `semantic-color-tokens.csv` → `tokens.generated.css` 경로는 그대로입니다. Phase 0에서 검증 대상으로만 쓰입니다.
- **검토 없는 자동 반영.** §2.1 참고.
