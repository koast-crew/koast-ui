# Changelog

## [1.0.20] - 2026-09-07

### Changed

- Button 컴포넌트를 디자인 시스템 스펙에 맞춤 (color/size 축소, 치수 변경)
- brand secondary 램프를 zinc 로, 비활성 텍스트를 zinc-500 으로 변경

### Fixed

- 비활성 버튼 금지 커서 표시 수정

## [1.0.19] - 2026-09-07

### Changed

- 배포 CSS 의 모든 유틸리티 클래스에 `koast-` 접두사 적용 (소비자 Tailwind 와 클래스 충돌 제거)
- 색상 클래스의 중복 `koast` 키 제거 (`bg-koast-danger-subtle` -> `koast-bg-danger-subtle`)
- `tailwindcss`, `tailwind-merge` 를 peerDependencies 에서 devDependencies 로 이동
- `autoprefixer`, `postcss` 를 dependencies 에서 devDependencies 로 이동
- 소비자 설치 패키지 78개 -> 1개로 감소

### Fixed

- Tailwind 4 프로젝트에서 `ERESOLVE` 로 설치가 실패하던 문제 수정
- content 스캐너가 주석·변수명을 클래스로 오인해 생성하던 죽은 CSS 규칙 8개 제거

## [1.0.18] - 2026-09-07

### Added

- 시맨틱 컬러 토큰 74종 도입 (`semantic-color-tokens.csv` 가 단일 원본)
- `npm run tokens` 로 CSS 변수 / Tailwind theme / 타입 메타데이터 생성 (빌드 시 자동 실행)
- 라이트/다크 테마 지원 (`data-koast-theme` 속성으로 하위 트리 단위 지정)
- brand 색상 주입 API `createBrandThemeCss()`, `createBrandThemeStyle()` 추가
- Button `neutral` intent 및 `focus-visible` 포커스 링 추가
- Storybook `Design System / Color Tokens` 팔레트 문서 추가

### Changed

- 패키지 import 만으로 스타일 적용 (별도 CSS import 및 tailwind.config 설정 불필요, `@koast/ui/styles.css` 통로는 유지)
- Button `color` 를 시맨틱 intent 유니온으로 제한 (`error`, `gray` 는 deprecated 별칭으로 유지)
- Button `customStyle` prop 제거
- Button 색상을 raw 팔레트에서 시맨틱 토큰으로 교체
- 배포 CSS 에서 Tailwind preflight 제거, 명시도 0 의 최소 리셋으로 대체
- `npx @koast/ui add-tailwind-config` 는 설정을 수정하지 않고 안내만 출력

### Fixed

- 정의되지 않은 `color` 값 전달 시 발생하던 런타임 크래시 수정
- Button 이 `<a>` 태그에 `disabled` 를 전달해 React 경고가 발생하던 문제 수정
- `focus:outline-none` 으로 포커스 표시가 사라지던 접근성 문제 수정
- 비활성 상태를 `opacity-50` 대신 disabled 토큰으로 처리

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
