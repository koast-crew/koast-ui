# 시맨틱 컬러 토큰 도입 작업 기록

- **날짜**: 2026-09-04
- **범위**: 디자인 토큰 인프라 구축, Button 색상 API 잠금, 스타일 배포 방식 전환
- **상태**: 타입체크 / 린트 / 빌드 통과. 시각적 렌더링 확인은 미완료 (아래 [검증 범위](#검증-범위) 참고)

---

## 1. 배경

작업 전 코드베이스 점검에서 색상과 직접 얽힌 문제가 나왔습니다.

| 문제 | 위치 | 내용 |
| :-- | :-- | :-- |
| 런타임 크래시 | `Button.styles.tsx:98` | `ButtonProps.color` 타입이 `... \| string` 이라 유니온이 무력화됨. 정의되지 않은 색을 넘기면 `colorMap[color][variant]` 가 `undefined[variant]` 로 터짐 |
| 스타일 미적용 | `README` / `tailwind.config.js` | README가 컴파일된 `dist/style.css` 를 Tailwind `content` 에 넣으라고 안내. Tailwind `content` 는 클래스명을 추출할 *소스*를 스캔하므로 아무것도 나오지 않음. 안내대로 설치하면 스타일이 안 나옴 |
| 전역 오염 | `dist/style.css` | Tailwind preflight 전체가 포함되어 소비자 앱에 `body { margin: 0 }` 등 전역 리셋을 주입 |
| 문서 불일치 | `README` vs `scripts/add-tailwind-config.js` | 같은 설정을 서로 다르게 안내 |

여기에 더해 컴포넌트 전반이 `bg-blue-600` 같은 raw 팔레트를 직접 쓰고 있어서, 디자인 시스템과 코드 사이에 연결 고리가 없었습니다.

**목표 두 가지**
1. 피그마의 시맨틱 컬러 토큰을 라이브러리에서 실제로 쓸 수 있게 만든다.
2. 라이브러리를 쓰는 쪽이 색상을 직접 지정할 수 없게 한다.

---

## 2. 선행 작업 — CSV 동기화

`semantic-color-tokens.csv` 를 피그마 최신 값과 대조해 10건을 수정했습니다.

- **신규 토큰 1개**: `color/content` 에 `subtle` (`zinc/200` / `zinc/600`)
- **yellow → amber 전환 6건**: `warning` 계열 전체. 색 계열만 바뀐 게 아니라 스케일 값도 조정됨
  - 특히 `bg/warning-bold` 는 light 500→600, dark 700→500 으로 **명도 방향이 반대로 뒤집힘**
  - `border/warning` dark 는 700→400 으로 크게 밝아짐
- **스케일 수정 2건**: `content/danger-bold` dark `red/300`→`red/600`, `bg/success-bold` light `green/700`→`green/600`

반영하지 않은 것: 피그마 쪽 오타 `info-sublte`, `success-sublte` (subtle 오기). CSV에는 올바른 철자를 유지했습니다. **피그마 변수명 자체를 고쳐두는 편이 좋습니다** — 나중에 자동 export를 붙이면 오타가 그대로 토큰 이름이 됩니다.

---

## 3. 구축한 구조

```
semantic-color-tokens.csv          ← 단일 원본 (피그마 반영 지점)
        │  npm run tokens  (npm run build 시 prebuild 로 자동 실행)
        ▼
src/styles/tokens.generated.css          CSS 변수 74개 · light/dark
src/styles/tokens/tailwind.generated.js  Tailwind theme 조각
src/styles/tokens/tokens.generated.ts    타입 + 메타데이터
        ▼
dist/style.css  ← 소비자는 이 파일 하나만 import
```

### 추가/변경 파일

| 파일 | 역할 |
| :-- | :-- |
| `scripts/generate-tokens.mjs` | CSV → CSS/JS/TS 생성기 |
| `src/styles/base.css` | preflight 대체 최소 리셋 |
| `src/theme/createBrandTheme.ts` | 프로젝트별 brand 주입 API |
| `src/styles/tokens/ColorTokens.stories.tsx` | Storybook 팔레트 문서 |
| `tailwind.config.js` | 역할별 스케일 등록, preflight 비활성화, ESM 전환 |
| `src/components/Button/*` | 색상 API 잠금 + 토큰 마이그레이션 |
| `scripts/add-tailwind-config.js` | 설정 수정 중단, 안내만 출력 |

### 잠금 경계

- **brand 램프** (`--koast-brand-primary-*`, `--koast-brand-secondary-*`) → CSS 변수. **프로젝트별로 주입 가능**
- **시맨틱 토큰 74개** → 리터럴 값으로 고정. **덮어쓸 통로 없음**

### 역할별 스케일 분리

`textColor` / `backgroundColor` / `borderColor` / `ringColor` / `boxShadowColor` 에 각각 등록했습니다.
배경 토큰을 텍스트 색으로 쓰는 오용이 클래스 수준에서 불가능해집니다.

```
text-koast-primary               content/primary
text-koast-interactive-primary   content/interactive/primary
bg-koast-danger-subtle           bg/danger-subtle
border-koast-focus-ring          border/focusRing
shadow-koast-cast                effect/shadow/cast
```

---

## 4. 결정과 고민 포인트

### 4.1 brand 기본값을 primary/secondary 모두 blue 로 둔 것

"프로젝트마다 받고, 없으면 blue" 라는 방침에 따라 두 램프 모두 Tailwind blue 를 기본값으로 넣었습니다.

처음에는 `secondary` 를 zinc(중립)로 두려 했습니다. 같은 램프면 primary와 구분이 안 될 것 같아서였는데, 실제로 확인해보니 **시맨틱 토큰이 서로 다른 단계를 참조**하고 있어서 문제가 없었습니다.

- `bg/interactive/primary` → brand/primary/**600** (진한 채움)
- `bg/interactive/secondary` → brand/secondary/**50** (옅은 채움)

램프가 같아도 결과 색이 충분히 다릅니다. 방침대로 blue 로 통일했습니다.

> **확인 필요**: 실제 프로젝트에서 primary와 secondary에 **같은 계열**을 넣을 경우, 위 단계 차이만으로 위계가 충분한지는 디자인 검토가 필요합니다.

### 4.2 `koast-` 전역 prefix를 포기하고 색상 토큰만 네임스페이스 — ⚠️ 방침에서 벗어난 부분

당초 방향은 Tailwind `prefix: 'koast-'` 로 **모든** 유틸리티를 네임스페이스하는 것이었습니다. 실제로 착수하려다 멈췄습니다.

- 전역 prefix는 `flex` → `koast-flex` 식으로 src 전체 **약 1,500개 유틸리티 사용처**를 치환해야 합니다
- 치환 대상이 JSX 문자열, 템플릿 리터럴, `twMerge` 인자에 흩어져 있어 정규식 기계 치환은 오탐이 나기 쉽습니다
- 그런데 **이 저장소에는 테스트가 0개**입니다 (`npm test` 는 `vitest` 가 설치조차 안 되어 실행 불가). 조용한 시각 깨짐을 잡을 수단이 없습니다

대신 색상 토큰만 `bg-koast-*` 형태로 네임스페이스했습니다.

| 목표 | 달성 여부 |
| :-- | :-- |
| 소비자 tailwind.config 설정 불필요 | ✅ |
| preflight(전역 리셋) 제거 | ✅ |
| CSS 1개만 import | ✅ |
| 색상 클래스 충돌 방지 | ✅ |
| 레이아웃 클래스(`flex`, `p-2` …) 충돌 방지 | ❌ 미적용 |

미적용분의 실제 위험은 낮다고 판단했습니다. 소비자도 Tailwind를 쓴다면 `.flex{display:flex}` 가 양쪽에서 동일하게 생성되어 무해합니다. 소비자가 **같은 이름의 유틸리티를 커스터마이즈**한 경우에만 문제가 되는데, 색상이 아닌 레이아웃 유틸리티를 재정의하는 사례는 드뭅니다.

> **결정 필요**: 전역 prefix가 꼭 필요하면 진행 가능합니다. 다만 **테스트를 먼저 깔고** 하는 것을 권합니다.

### 4.3 preflight 제거 시 버튼이 깨지는 문제

preflight를 끄면 전역 오염은 사라지지만, `<button>` 이 브라우저 기본 스타일(회색 배경, 테두리)을 되찾아 컴포넌트가 깨집니다.

컴포넌트에 공통 루트 클래스가 없어서 스코프 리셋을 걸 수 없었습니다. 선택한 방법은 **`:where()` 로 감싼 최소 리셋** 입니다.

```css
:where(button, [type='button'], [type='reset'], [type='submit']) { ... }
```

`:where()` 는 명시도가 0이라 소비자 앱의 어떤 규칙이든 별도 조치 없이 이깁니다. 리셋 대상도 라이브러리가 실제로 렌더링하는 요소(button, svg, input)로만 한정했습니다.

> **남은 트레이드오프**: `box-sizing: border-box` 만은 전체 선택자(`*, ::before, ::after`)로 남겼습니다. 컴포넌트의 padding 계산이 border-box를 전제하기 때문입니다. 전체 선택자라 명시도는 0이지만, 이것만은 전역에 적용됩니다.

### 4.4 색상 값을 hex가 아닌 RGB 채널로 저장

```css
--koast-content-primary: 24 24 27;   /* '#18181b' 이 아님 */
```

Tailwind의 불투명도 수식어(`bg-koast-primary/50`)를 지원하려면 `rgb(var(--x) / <alpha-value>)` 형태여야 하고, 그러려면 변수가 채널 표기여야 합니다. hex로 저장하면 `/50` 이 동작하지 않습니다.

부작용: 프로젝트가 brand를 주입할 때 채널 표기를 직접 쓰게 하면 실수하기 쉽습니다. → `createBrandThemeCss()` 가 hex를 받아 변환하고 형식 검증까지 하도록 만들었습니다.

### 4.5 그림자 토큰만 리터럴로 예외 처리

`{Color/transparent/16}` 은 색이 아니라 **불투명도**가 라이트/다크에서 달라지는 토큰입니다(16% / 24%). 채널 표기로는 알파를 표현할 수 없어 이것만 완성된 색상 값으로 내보냅니다.

```css
--koast-shadow-cast: rgb(0 0 0 / 0.16);
```

대가로 `shadow-koast-cast/50` 같은 불투명도 수식어는 그림자 토큰에서 동작하지 않습니다. 실사용 가치가 낮아 감수했습니다.

> **가정**: `transparent/N` 을 **검정 기준** 불투명도로 해석했습니다. CSV에 기준색이 명시되어 있지 않습니다. 다크 모드에서 그림자가 더 진해지는(16%→24%) 패턴이 검정 그림자와 맞아떨어져 이렇게 판단했습니다. 흰색 기준이었다면 수정이 필요합니다.

### 4.6 Button intent 집합 설계 — 디자인 시스템의 공백

토큰 시스템을 보면 **대화형 상태(hovered/pressed)가 정의된 색은 primary / secondary / selected / danger 뿐**입니다. info / warning / success 는 정적 표시용 토큰만 있습니다.

세 가지 선택지가 있었습니다.

1. Button `color` 를 `primary | secondary | danger` 로만 축소 → 시스템에 가장 충실하지만 기존 API를 크게 깎아냄
2. 상태 색도 그대로 두되 hover 없이 → 인터랙션 피드백이 사라짐
3. **상태 색은 불투명도로 hover 처리** → 선택

3번을 택해 기존 API 표면을 유지했습니다. 새 색을 만들지 않으므로 토큰 시스템 밖으로 나가지 않습니다.

```
primary / secondary / neutral / danger  → 시스템 토큰으로 hover·pressed
info / warning / success                → hover:opacity-90 active:opacity-80
```

`gray` 는 `neutral` 로 이름을 바꿨고(`bg/inverse-bold` + `bg/inverse-bolder` 사용), `error`→`danger`, `gray`→`neutral` 별칭을 deprecated 로 남겨 기존 코드가 깨지지 않게 했습니다.

> **디자인 확인 필요**: 상태 색(info/warning/success)에 대화형 상태 토큰을 추가할지, 아니면 애초에 **버튼에 상태 색을 쓰지 않는 것**이 시스템의 의도인지. 후자라면 1번으로 다시 좁히는 게 맞습니다.

### 4.7 채색된 배경 위 라벨 색 — 대비 문제

채워진 버튼의 라벨 색을 고르면서 걸린 부분입니다.

| intent | 배경 (light / dark) | 선택한 라벨 | 이유 |
| :-- | :-- | :-- | :-- |
| primary | brand/600 / brand/400 | `content/interactive/inverse` (흰색/zinc-900) | 명도가 반대로 뒤집혀 그대로 맞음 |
| danger | red/600 / red/500 | `media/on-dark` (항상 흰색) | 다크에서 red/500 위에 zinc-900은 부적절 |
| info | blue/700 / blue/400 | `content/interactive/inverse` | 위와 동일 패턴 |
| warning | amber/600 / amber/500 | `media/on-light` (항상 zinc-900) | 흰 라벨은 대비 부족 |
| success | green/600 / green/300 | `media/on-light` | 위와 동일 |

이를 위해 `media/on-dark`, `media/on-light` 를 텍스트 스케일에도 등록했습니다. 원래 미디어 토큰이지만 "어두운/밝은 표면 위의 콘텐츠"라는 의미가 정확히 들어맞습니다.

> ⚠️ **대비비 미측정**: 위 판단은 육안 기준 추정입니다. **WCAG AA(4.5:1) 실측을 하지 않았습니다.** 특히 `warning`(amber/600 위 zinc-900), `success`(green/600 위 zinc-900) 조합은 검증이 필요합니다.

### 4.8 disabled 토큰의 낮은 대비

기존 구현은 `opacity-50` 으로 전체를 흐리게 만들었습니다. 시스템에 `bg/disabled`, `content/disabled` 토큰이 있으므로 그쪽으로 교체했습니다.

그런데 채워진 버튼의 비활성 조합이 이렇게 됩니다.

- light: 배경 `zinc/300` + 텍스트 `zinc/400`
- dark: 배경 `zinc/500` + 텍스트 `zinc/300`

**light 조합의 대비가 매우 낮습니다.** 비활성 상태라 의도된 것일 수 있지만, 라벨을 읽을 수 없는 수준일 가능성이 있습니다. 시스템이 정의한 두 토큰을 그대로 쓰는 것이 맞다고 보고 그대로 두었습니다.

> **디자인 확인 필요**: 채워진 비활성 버튼의 라벨 색을 `content/disabled` 가 아닌 다른 토큰으로 할지.

### 4.9 다크 모드 셀렉터를 `:root` 에서 분리

처음에는 `:root[data-koast-theme='dark']` 로 생성했는데, Storybook 팔레트 문서에서 **한 페이지에 라이트/다크를 나란히** 보여주려다 동작하지 않는 걸 발견했습니다.

`[data-koast-theme='dark']` (`:root` 제거)로 바꿔서 임의의 하위 트리에 테마를 적용할 수 있게 했습니다. 최종 구조는 이렇습니다.

```css
:root { /* 라이트 기본값 + brand */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-koast-theme='light']) { /* OS 설정 추종 */ }
}

[data-koast-theme='light'] { /* 다크 페이지 안의 라이트 섬 */ }
[data-koast-theme='dark']  { /* 명시적 다크 */ }
```

명시적 지정 블록이 `:root` 보다 **뒤에** 와야 소스 순서로 우선합니다(둘 다 명시도 0,1,0). 생성기에서 이 순서를 보장합니다.

### 4.10 `tailwind-merge` 그룹 분류 확인

`shadow-lg shadow-koast-cast` 처럼 크기와 색을 같이 쓸 때 twMerge가 한쪽을 지울까 우려했습니다. 확인 결과 안전합니다.

- `shadow-lg` → t-shirt 크기 매칭 → `shadow` 그룹
- `shadow-koast-cast` → 크기 아님 → `shadow-color` 그룹

`text-base` / `text-koast-primary`, `border` / `border-koast-primary` 도 같은 원리로 분리됩니다. **현재는 별도 설정 없이 동작합니다.**

> **유의**: 향후 `koast-500` 처럼 **숫자로 끝나는 토큰 이름**을 추가하면 분류가 어긋날 수 있습니다. 그때는 `extendTailwindMerge` 설정이 필요합니다.

---

## 5. 검증 범위

### 확인한 것

| 항목 | 방법 | 결과 |
| :-- | :-- | :-- |
| 타입 체크 | `tsc --noEmit` | 통과 |
| 린트 | `eslint .` | 통과 (0 error / 0 warning) |
| 빌드 | `npm run build` | 통과 |
| 크래시 버그 해소 | `normalizeColor` 를 esbuild 번들로 직접 실행 | `'blue-600'`, `'#ff0000'`, `''`, `null`, `undefined`, `42` 전부 크래시 없이 `primary` 로 폴백 |
| 별칭 동작 | 동일 | `error`→`danger`, `gray`→`neutral` |
| preflight 제거 | `dist/style.css` 에서 `body{margin:0` 검색 | 0건 |
| 토큰 변수 생성 | `dist/style.css` 변수 개수 | 시맨틱 74개 + brand 20개 |
| 변수 해석 체인 | `dist/style.css` 규칙 추적 | `.bg-koast-interactive-primary` → `var(--koast-bg-interactive-primary)` → `var(--koast-brand-primary-600)` → `37 99 235` = `#2563eb` |
| 다크 값 분기 | 동일 | `--koast-content-primary` 가 light `24 24 27` / dark `255 255 255` |
| hover 변형 생성 | 동일 | `.hover\:bg-koast-interactive-primary-hovered:hover` 규칙 존재 |
| dev 서버 컴파일 | vite 기동 + 모듈 요청 | 200 응답, 트랜스폼 정상 |

### 확인하지 못한 것

- **실제 브라우저 렌더링**. Chrome 확장이 연결되지 않아 스크린샷을 찍지 못했습니다. 위 검증은 전부 CSS 규칙과 값 추적 수준입니다.
- **대비비(WCAG) 실측**. 4.7 / 4.8 의 판단은 추정입니다.
- **회귀 테스트**. 저장소에 테스트가 0개이며 `vitest` 가 devDependencies 에 없어 `npm test` 자체가 실행되지 않습니다.

> dev 플레이그라운드에 `ButtonExam` 을 intent × variant × 상태 매트릭스로 교체해두었습니다.
> `npm run dev` 로 라이트/다크를 나란히 눈으로 확인할 수 있습니다.

---

## 6. 남은 일

### 우선순위 높음

1. **`vitest` 설치 + 회귀 테스트**. 전역 prefix든 나머지 컴포넌트 마이그레이션이든, 안전하게 하려면 이게 먼저입니다.
2. **브라우저 시각 확인**. `npm run dev` 또는 Storybook 으로 매트릭스 검토.
3. **대비비 실측**. 특히 warning/success 채움 버튼, disabled 채움 버튼.

### 나머지 컴포넌트 마이그레이션

소비자 API에는 색상 통로가 없어 **잠금 목표에는 영향이 없지만**, 내부적으로 raw 팔레트가 남아 있습니다.

| 컴포넌트 | raw 색상 클래스 | 비고 |
| :-- | --: | :-- |
| TimeSlider | 83 | `theme` prop(`dark`/`light`/`cool`/`warm`)이 자체 그라데이션 팔레트 보유. **디자인 결정 필요** |
| Select | 27 | 폼 요소. focus/error 토큰이 이미 있어 이전이 자연스러움 |
| FolderTree | 12 | |
| MapLegend | 9 | 단, 범례 **데이터**의 hex는 토큰화 대상 아님 |
| ButtonGroup | 2 | |

> **TimeSlider 의 `theme` prop 을 어떻게 할지가 가장 큰 미결 사항입니다.**
> 시맨틱 토큰 체계와 4종 테마 팔레트는 개념이 겹칩니다. `theme` 을 없애고 토큰에 흡수시킬지,
> 별도 축으로 유지할지 정해야 합니다.

### 색상 외 이슈

작업 전 점검에서 나온 나머지 문제들은 이번 범위 밖입니다. `TimeSlider` / `FolderTree` 의 무한 렌더 루프,
`generateSteps` 의 `stepValue: 0` 무한 루프, `Select` 의 값 `0` 처리 및 키보드 미지원,
패키징(`autoprefixer`/`postcss` 가 `dependencies` 에 위치), CI 설정 등이 남아 있습니다.

---

## 7. 참고 — 소비자 관점 변경 요약

**BREAKING CHANGE** 입니다. 마이그레이션 안내가 필요합니다.

```diff
# 설치 후 설정
- npx @koast/ui add-tailwind-config      # 더 이상 설정을 수정하지 않음
- // tailwind.config.js content 에 추가
+ import '@koast/ui/styles.css';         // 진입점에서 한 줄

# Button
- <Button color="#ff0000" />             // 타입 에러
- <Button customStyle={{ color: 'red' }} />  // prop 제거
+ <Button color="danger" />

- <Button color="error" />               // 동작하지만 deprecated
- <Button color="gray" />                // 동작하지만 deprecated
+ <Button color="danger" />
+ <Button color="neutral" />
```

토큰 수정 워크플로우는 `README.md` 의 "토큰 수정 워크플로우" 절을 참고하세요.
