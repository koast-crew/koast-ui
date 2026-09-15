# Tooltip

Tooltip(툴팁) 컴포넌트입니다. 트리거에 마우스를 올리거나 키보드 포커스를 주면 보조 설명을 띄웁니다. 포커스로도 열리고 Escape 로 닫히므로 키보드만으로도 내용을 읽을 수 있습니다.

```tsx
import { Tooltip } from '@koast/ui';
```

## 사용 예

```tsx
<Tooltip content="현재 문서를 저장합니다">
  <Button>저장</Button>
</Tooltip>

<Tooltip content="설명" placement="right" align="start" variant="inverse">
  <Button variant="text">도움말</Button>
</Tooltip>

// 화살표 없이 (Figma Direction=None)
<Tooltip content="설명" arrow={false}>
  <span>항목</span>
</Tooltip>
```

## Props

### `TooltipProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `content` *(필수)* | `React.ReactNode` | — | 툴팁에 표시될 내용입니다. |
| `children` *(필수)* | `React.ReactElement` | — | 툴팁을 띄울 트리거입니다. `aria-describedby` 를 붙일 수 있는 단일 엘리먼트여야 합니다. |
| `placement` | `TooltipPlacement` | `'top'` | 트리거를 기준으로 패널이 놓이는 변입니다. |
| `align` | `TooltipAlign` | `'center'` | 놓인 변 위에서의 정렬입니다. |
| `variant` | `TooltipVariant` | `'default'` | 면 색입니다. |
| `arrow` | `boolean` | `true` | 화살표 표시 여부입니다. Figma 의 `Direction=None` 이 `false` 에 해당합니다. |
| `open` | `boolean` | — | 열림 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultOpen` | `boolean` | `false` | 비제어로 쓸 때의 초기 열림 상태입니다. |
| `onOpenChange` | `(open: boolean) => void` | — | 열림 상태가 바뀔 때 호출됩니다. |
| `disabled` | `boolean` | `false` | 툴팁을 끕니다. 트리거만 그대로 렌더링됩니다. |
| `maxWidth` | `number \| string` | `240` | 패널의 최대 너비입니다. 숫자는 px 로 해석됩니다. |
| `className` | `string` | — | 트리거를 감싸는 래퍼의 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — | 패널의 id 입니다. 생략하면 자동 생성되며 트리거의 `aria-describedby` 와 연결됩니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `TooltipPlacement` | `'top' \| 'bottom' \| 'left' \| 'right'` | 트리거를 기준으로 툴팁 패널이 놓이는 변입니다. Figma 의 **Direction** 축은 화살표가 붙는 변으로 이름이 지어져 있어 방향이 반대입니다 (Figma `Below` = 화살표가 아래 = 패널은 위 = `top`). |
| `TooltipAlign` | `'start' \| 'center' \| 'end'` | 놓인 변 위에서의 정렬입니다. Figma 의 Left/Center/Right, Top/Middle/Bottom 에 대응합니다. |
| `TooltipVariant` | `'default' \| 'inverse'` | Figma 의 **Style** 축입니다. default 는 어두운 면, inverse 는 밝은 면입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

