# Changelog

## [1.0.18] - 2026-09-07
### Added
- 디자인 시스템 시맨틱 컬러 토큰 74종 도입 (`semantic-color-tokens.csv` 가 단일 원본)
- `npm run tokens` 로 CSV → CSS 변수 / Tailwind theme / 타입 메타데이터 생성 (`npm run build` 시 자동 실행)
- 라이트/다크 테마 지원. `data-koast-theme` 속성으로 하위 트리 단위 지정 가능
- 프로젝트별 brand 색상 주입 API `createBrandThemeCss()`, `createBrandThemeStyle()` (미지정 시 Tailwind blue)
- Button `neutral` intent 추가, 포커스 링(`focus-visible`) 추가
- Storybook `Design System / Color Tokens` 팔레트 문서 추가

### Changed
- **BREAKING** 스타일 적용 방식 변경. 소비 프로젝트의 tailwind.config 설정이 불필요해졌습니다. ESM 진입점이 CSS 를 side-effect 로 import 하므로 **별도의 스타일 import 도 필요 없습니다** — `import { Button } from '@koast/ui'` 만으로 스타일까지 적용됩니다. UMD 소비자와 CSS 로딩 순서를 직접 제어해야 하는 경우를 위해 `@koast/ui/styles.css` 통로는 유지됩니다
- **BREAKING** Button `color` 가 시맨틱 intent 유니온으로 닫혔습니다. 임의의 색상 문자열은 타입 에러입니다 (`error` → `danger`, `gray` → `neutral` 별칭은 deprecated 상태로 유지)
- **BREAKING** Button `customStyle` prop 제거. 색상은 `color` / `variant` 로만 지정합니다
- Button 의 모든 색상이 raw 팔레트에서 시맨틱 토큰으로 교체되었습니다
- 배포 CSS 에서 Tailwind preflight(전역 리셋)를 제거하고, 명시도 0 의 최소 리셋으로 대체했습니다
- `npx @koast/ui add-tailwind-config` 는 더 이상 설정을 수정하지 않고 안내만 출력합니다

### Fixed
- 정의되지 않은 `color` 값을 넘기면 `colorMap[color][variant]` 에서 런타임 크래시가 나던 문제
- Button 이 `<a>` 태그에 `disabled` 속성을 전달해 React 경고가 발생하던 문제
- Button 이 `focus:outline-none` 으로 포커스 표시를 없애기만 하던 접근성 문제
- 비활성 상태를 `opacity-50` 으로 뭉개던 것을 disabled 토큰으로 교체

## [1.0.17] - 2026-02-10
### Fixed
- NPM Token 갱신
- TimeSlider 초기 렌더링 시 선택된 툴팁 위치가 잘못 표시되는 버그 수정

## [1.0.16] - 2026-02-10
### Changed
- TimeSlider 컴포넌트 레이아웃 개선 (Play 버튼 왼쪽, Prev/Next 버튼 오른쪽 배치)
- TimeSlider Play/Stop 버튼을 SVG 아이콘으로 변경 및 중앙 정렬 수정
- TimeSlider 버튼 크기 증가 및 hover/active 애니메이션 추가
- TimeSlider 테마 색상 전면 리뉴얼 (그라데이션 및 shadow 효과 적용)
- TimeSlider 선택된 툴팁 위치를 플레이바 오른쪽 끝 기준으로 변경
### Added
- TimeSlider 마지막 스텝에서 Next/Play 시 처음으로 되돌아가는 기능 추가
### Fixed
- TimeSlider Storybook에 min-width decorator 추가하여 레이아웃 깨짐 방지

## [1.0.15] - 2025-08-12
### Added
- Select 컴포넌트 시멘틱 클래스명 추가
### Fixed
- Select 컴포넌트 `value` 속성 제네릭 타입 정보 유지

## [1.0.14] - 2025-08-07
### Added
- Select 컴포넌트 시멘틱 클래스명 추가
### Fixed
- Select 컴포넌트 fullWidth 속석 제거 및 selectedItemClassName 추가

## [1.0.13] - 2025-07-15
### Added
- Select 컴포넌트 bgClassName 추가

## [1.0.12] - 2025-07-14
### Fixed
- 전체 컴포넌트 clsx -> tailwind-merge 변경
- clsx 의존성 제거

## [1.0.11] - 2025-07-11
### Test
- tailwind-merge 테스트(Button 컴포넌트)

## [1.0.10] - 2025-07-11
### Fixed
- 1.0.9 버전 롤백
- add-tailwind-config.js 수정(tailwind.config.ts 에서도 동작)

## [1.0.9] - 2025-07-11
### Test
- Tailwind prefix 추가 및 ClassName 충돌 테스트

## [1.0.8] - 2025-04-29
### Test
- 빌드 테스트

## [1.0.7] - 2025-04-29
### Fixed
- 빌드 entry 파일 이름 변경

## [1.0.6] - 2025-04-29
### Test
- production 빌드 테스트

## [1.0.5] - 2025-04-29
### Test
- vite minify 설정 테스트

## [1.0.4] - 2025-04-29
### Test
- 빌드 package, vite 설정 테스트

## [1.0.3] - 2025-04-29
### Added
- 빌드 시 불필요한 폴더 제거

## [1.0.2] - 2025-04-28
### Test
- Publish 실패로 access: "public" 추가 후 배포 테스트
### Added
- README github pages 주소 수정

## [1.0.1] - 2025-04-28
### Fixed
- 설정 중 koast-ui 라이브러리 이름을 @koast/ui로 변경
### Test
- storybook github pages 배포 테스트

## [1.0.0] - 2025-04-28
### Added
- 1.0.0 버전 Release
- 이전 버전은 judahwon 개인 라이브러리(https://www.npmjs.com/package/koast-ui)에서 확인 가능