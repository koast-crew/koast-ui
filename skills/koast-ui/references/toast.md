# Toast

Toast(토스트) 컴포넌트입니다. 작업 결과를 짧게 알리는 일시적 알림이며, `duration` 을 주면 스스로 사라집니다. 화면 배치(하단 고정·스택·애니메이션)는 이 컴포넌트가 하지 않고 감싸는 쪽이 정합니다.

```tsx
import { Toast } from '@koast/ui';
```

## 사용 예

```tsx
<Toast status="success" title="업로드 완료" onClose={dismiss} duration={4000}>
  파일이 성공적으로 업로드되었습니다.
</Toast>

// 본문 오른쪽에 액션을 두는 형태
<Toast
  status="error"
  type="action"
  title="전송 실패"
  actionLabel="다시 시도"
  onAction={retry}
  onClose={dismiss}
>
  네트워크 연결을 확인해 주세요.
</Toast>

// 액션 라벨이 길어 본문 아래로 내리는 형태
<Toast type="longAction" status="inverse" title="설정이 저장되었습니다" actionLabel="변경 내용 되돌리기" onAction={undo} onClose={dismiss} />
```

## Props

### `ToastProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `status` | `ToastStatus` | `'neutral'` | 상태 색을 정합니다. |
| `type` | `ToastType` | `'text'` | 액션 행의 배치를 정합니다. |
| `title` *(필수)* | `React.ReactNode` | — | 굵은 제목 줄입니다. |
| `children` | `React.ReactNode` | — | 제목 아래 본문입니다. 없으면 제목만 한 줄로 표시됩니다. |
| `actionLabel` | `React.ReactNode` | — | 액션 버튼의 라벨입니다. `type` 이 `'action'` · `'longAction'` 일 때만 쓰입니다. |
| `onAction` | `() => void` | — | 액션 버튼의 클릭 핸들러입니다. |
| `onClose` | `() => void` | — | 닫기 버튼의 클릭 핸들러이자 `duration` 이 끝났을 때 호출되는 함수입니다. 없으면 닫기 버튼이 렌더링되지 않습니다. |
| `closeLabel` | `string` | `'알림 닫기'` | 닫기 버튼의 `aria-label` 입니다. |
| `duration` | `number` | — | 자동으로 닫히기까지의 시간(ms)입니다. `onClose` 가 있어야 동작합니다. 포인터가 올라가 있거나 내부에 포커스가 있는 동안에는 타이머가 멈춥니다(WCAG 2.2.1). 생략하거나 0 이하면 자동으로 닫히지 않습니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `ToastType` | `'text' \| 'action' \| 'longAction'` | Figma 의 **Type** 축입니다. text 는 본문만, action 은 본문 오른쪽에 액션 행, longAction 은 본문 아래에 액션 행을 둡니다. (Figma 표기 `Text only` / `Text & Action` / `Text & Long Action`) |
| `ToastStatus` | `'brand' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'inverse'` | Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

