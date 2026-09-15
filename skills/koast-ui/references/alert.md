# Alert

Alert(알림) 컴포넌트입니다. 주의가 필요한 정보나 작업 결과를 화면 흐름 안에 그대로 붙여 보여주는 인라인 알림입니다.

```tsx
import { Alert } from '@koast/ui';
```

## 사용 예

```tsx
<Alert status="success" title="저장이 완료되었습니다" />

<Alert status="error" variant="outlined" title="비밀번호가 잘못되었습니다" onClose={handleClose}>
  5회 이상 실패하면 계정이 잠깁니다.
</Alert>

// 닫기 버튼 없이
<Alert status="info" variant="transparent" title="점검 예정" icon={false} closable={false}>
  3월 1일 02:00 ~ 04:00 사이 서비스가 중단됩니다.
</Alert>
```

## Props

### `AlertProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `status` | `AlertStatus` | `'neutral'` | 상태 색을 정합니다. |
| `variant` | `AlertVariant` | `'filled'` | 면 처리 방식입니다. |
| `title` *(필수)* | `React.ReactNode` | — | 굵은 제목 줄입니다. |
| `children` | `React.ReactNode` | — | 제목 아래 본문입니다. 없으면 제목만 한 줄로 표시됩니다. |
| `icon` | `React.ReactNode \| false` | — | 제목 앞 아이콘입니다. 지정하지 않으면 status 별 기본 아이콘이 붙고, `false` 를 주면 아이콘 없이 본문만 표시합니다. |
| `closable` | `boolean` | `true` | 닫기 버튼을 보여줍니다. |
| `onClose` | `() => void` | — | 닫기 버튼을 눌렀을 때 호출됩니다. 알림은 핸들러 유무와 무관하게 스스로 사라지므로, 이 값은 알림용입니다. |
| `closeLabel` | `string` | `'알림 닫기'` | 닫기 버튼의 `aria-label` 입니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `AlertVariant` | `'filled' \| 'outlined' \| 'transparent'` | Figma 의 **Style** 축입니다. filled 는 진한 면 + 1px 테두리, outlined 는 옅은 면 + 2px 테두리, transparent 는 테두리 없는 옅은 면입니다. |
| `AlertStatus` | `'brand' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

