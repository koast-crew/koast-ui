# KOAST UI

한국해양기상기술을 위한 **React UI 라이브러리**입니다.

작은 단위의 ui부터 프로젝트에 꼭 필요한 Slider, Legend 등 제작할 예정입니다.

(기존에는 [http://10.2.10.79:4873](http://10.2.10.79:4873)에 [Verdaccio](https://verdaccio.org/)를 구축하여 진행했습니다만, 그렇게 진행할 필요가 없어서 npmjs.org에 직접 배포하는 방식으로 변경하였습니다.)

- NPM 배포 : [koast-ui](https://www.npmjs.com/package/koast-ui)
- 문서 : [koast-ui storybook](https://judahwon.github.io/koast-ui/)
  (`github pages`를 사용하기 위해 `judahwon` 계정에서 public repo로 배포하고 있습니다.)
- `Publish` 권한이 필요한 경우, `judahwon`에게 요청해주시기 바랍니다.
- 추가적으로, main branch에 push될 때마다 자동으로 배포되도록 설정하였습니다. 또한, PR merge될 때마다 NPM 배포도 자동으로 진행됩니다.

<br>

## 환경

- node >= 20
- npm >= 9
- react >= 18 (권장 >= 19)
- typescript >= 5
- tailwindcss >= 3
- eslint >= 9
- vite >= 5

<br>

## 프로젝트 실행 방법(PR을 위한)

### 1. project clone

- https

```bash
git clone https://github.com/koast-crew/koast-ui.git
```

### 2. npm install

```bash
npm install
```

### 3. npm run build

```bash
npm run build
```

### 4. npm run dev

- 아직은 playground이 없고, dev폴더에서 테스트를 해볼 수 있습니다.

```bash
npm run dev
```

<br>

## 프로젝트에서 koast-ui 사용 방법

### 1. 패키지 설치

```bash
npm install @koast/ui
```

### 2. tailwind.config.js 파일에 추가

- koast-ui 패키지에서 사용하는 클래스명이 충돌나지 않도록 하기 위해서는 tailwind.config.js 파일에 추가해야 합니다.
- 프로젝트 루트(tailwind.config.js가 있는 폴더)에서 아래 명령어를 실행하면 자동으로 tailwind.config.js 파일에 추가됩니다.
```bash
npx @koast/ui add-tailwind-config
```

- 만약 오류가 생긴 경우, content 설정을 직접 추가해주세요.

```js
content: [
  "./node_modules/@koast/ui/dist/style.css",
],
```

### 3. 패키지 사용

```tsx
import { Button } from "@koast/ui";

const App = () => {
  return <Button>Click me</Button>;
};

export default App;
```

<br>

## 제작할 컴포넌트 목록

### 베타 기능

| 제작여부 |  컴포넌트   |      설명       |
| :------: | :---------: | :-------------: |
|    ✅    |   Button    |      버튼       |
|    ✅    | ButtonGroup |    버튼 그룹    |
|    ✅    |   Select    | 셀렉트 드롭다운 |
|          |  CheckBox   |    체크박스     |
|          | RadioGroup  |   라디오 그룹   |
|          |   Slider    |    슬라이더     |
|    ✅      | TimeSlider  |  시간 슬라이더  |
|          |   Switch    |     스위치      |
|          |  TextField  |   텍스트 필드   |
|          |    Table    |     테이블      |
|          |  Progress   |  프로그레스 바  |
|          |  Accordion  |    아코디언     |
|          | Pagination  |  페이지네이션   |
|    ✅      |  MapLegend  |    지도 범례    |

### 베타 기능 이후 제작 예정

| 제작여부 | 컴포넌트 |           설명            |
| :------: | :------: | :-----------------------: |
|          | Skeleton | 스켈레톤 - 로딩 상태 표시 |
|          | Tooltip  |           툴팁            |
|          |  Alert   |           알림            |
