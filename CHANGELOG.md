# Changelog

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