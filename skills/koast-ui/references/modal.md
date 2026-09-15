# Modal

Modal(대화 상자) 컴포넌트입니다. 화면 위에 떠서 사용자의 주의를 집중시키는 대화 상자로, 중요한 확인·입력 작업에 사용합니다. `createPortal` 로 `document.body` 에 붙어 `overflow: hidden` 조상 안에서도 잘리지 않습니다. 열리면 대화 상자 안으로 포커스를 가두고(Tab / Shift+Tab), 닫히면 열기 전 요소로 포커스를 되돌립니다. 열려 있는 동안 배경 스크롤은 잠깁니다.

```tsx
import { Modal } from '@koast/ui';
```

## 사용 예

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Remove Access Group"
  description="Are you sure you want to remove this access group?"
  cancelLabel="Cancel"
  confirmLabel="Remove"
  confirmColor="danger"
  onConfirm={handleRemove}
/>

// 본문 슬롯과 버튼 스택을 직접 합성
<Modal
  open={open}
  onClose={close}
  title="Create Access Group"
  description="Enter an access group name."
  footer={<Button variant="contained" onClick={submit}>생성</Button>}
>
  <TextField label="이름" />
</Modal>
```

## Props

### `ModalProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `open` *(필수)* | `boolean` | — | 열림 상태입니다. false 면 아무것도 렌더링하지 않습니다. |
| `onClose` *(필수)* | `() => void` | — | 닫기 요청 콜백입니다. 닫기 버튼·Escape·배경 클릭이 모두 이 콜백을 부릅니다. |
| `title` *(필수)* | `React.ReactNode` | — | Figma `Title` 슬롯입니다. 제목이며 `aria-labelledby` 로 대화 상자에 연결됩니다. |
| `description` | `React.ReactNode` | — | Figma `Description` 슬롯입니다. 주면 `aria-describedby` 로 연결됩니다. |
| `children` | `React.ReactNode` | — | Figma `Slot group` 슬롯입니다. 자식들은 16px 세로 간격으로 쌓입니다. |
| `footer` | `React.ReactNode` | — | Figma `Button Stack` 슬롯입니다. 직접 합성하려면 여기에 `Button` 을 넣으세요. 주면 `confirmLabel` / `cancelLabel` 기반의 기본 스택을 대신합니다. |
| `confirmLabel` | `React.ReactNode` | — | 기본 Button Stack 의 주 버튼 라벨입니다. `footer` 가 있으면 무시됩니다. |
| `cancelLabel` | `React.ReactNode` | — | 기본 Button Stack 의 보조 버튼 라벨입니다. `footer` 가 있으면 무시됩니다. |
| `onConfirm` | `() => void` | — | 주 버튼 클릭 콜백입니다. |
| `onCancel` | `() => void` | — | 보조 버튼 클릭 콜백입니다. 생략하면 `onClose` 가 쓰입니다. |
| `confirmColor` | `ModalConfirmColor` | `'primary'` | 주 버튼의 intent 입니다. |
| `confirmLoading` | `boolean` | `false` | 주 버튼의 로딩 상태입니다. |
| `confirmDisabled` | `boolean` | `false` | 주 버튼의 비활성화 상태입니다. |
| `footerAlign` | `ModalFooterAlign` | `'end'` | Button Stack 의 가로 정렬입니다. |
| `showCloseButton` | `boolean` | `true` | 헤더 오른쪽 닫기 버튼 표시 여부입니다. |
| `closeLabel` | `string` | `'닫기'` | 닫기 버튼의 `aria-label` 입니다. |
| `closeOnEscape` | `boolean` | `true` | Escape 키로 닫을지 여부입니다. |
| `closeOnOverlayClick` | `boolean` | `true` | 배경(overlay) 클릭으로 닫을지 여부입니다. |
| `initialFocusRef` | `React.RefObject<HTMLElement \| null>` | — | 열렸을 때 포커스를 받을 요소입니다. 생략하면 대화 상자 안 첫 포커스 대상입니다. |
| `width` | `number \| string` | `464` | 대화 상자의 최대 너비입니다. 숫자는 px 로 해석됩니다. |
| `container` | `HTMLElement \| null` | `document.body` | portal 이 붙을 대상입니다. |
| `className` | `string` | — | 레이아웃 조정용 CSS 클래스입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — | 대화 상자 id 입니다. 생략하면 자동 생성됩니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `ModalFooterAlign` | `'start' \| 'center' \| 'end'` | Footer 버튼 스택의 가로 정렬입니다. Figma 에 정렬 값이 없어 열어 둔 축입니다. |
| `ModalConfirmColor` | `'primary' \| 'danger'` | 주 버튼의 intent 입니다. Figma 의 Primary button 이 인스턴스에 따라 파랑(`#2563eb`) 과 빨강(`#dc2626`) 두 가지로 나타납니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

