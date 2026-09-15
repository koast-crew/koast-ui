# Tabs

Tabs 컴포넌트입니다. 같은 화면 안에서 여러 콘텐츠 섹션을 탭으로 나눠 전환합니다. 탭 줄은 Tab 키로 한 번에 통과하고, 안에서는 ← / → 와 Home / End 로 이동합니다. 이동과 동시에 해당 탭이 선택되며 비활성 탭은 건너뜁니다.

```tsx
import { Tabs } from '@koast/ui';
```

## 사용 예

```tsx
<Tabs defaultValue="detail" aria-label="상품 정보">
  <TabItem value="detail" label="설명">상품 상세 설명입니다.</TabItem>
  <TabItem value="review" label="리뷰">리뷰 12건</TabItem>
</Tabs>

// 제어 + 아이콘 + 비활성 탭
<Tabs value={tab} onChange={setTab}>
  <TabItem value="map" label="지도" icon={<Map />}>지도</TabItem>
  <TabItem value="stats" label="통계" disabled>통계</TabItem>
</Tabs>
```

## Props

### `TabsProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` | `string` | — | 선택된 탭의 `value` 입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `string` | — | 비제어로 쓸 때의 초기 선택값입니다. 없으면 첫 번째 활성 탭이 선택됩니다. |
| `onChange` | `(value: string) => void` | — | 선택된 탭이 바뀔 때 호출됩니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `children` *(필수)* | `React.ReactNode` | — | 탭 목록입니다. `TabItem` 만 넣습니다. |
| `id` | `string` | — | 루트 요소의 id 입니다. 내부 요소 id 의 접두사로도 쓰입니다. |

### `TabItemProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` *(필수)* | `string` | — | 탭을 구분하는 값입니다. 선택 상태의 키로 쓰입니다. |
| `label` *(필수)* | `React.ReactNode` | — | 탭 버튼에 표시되는 라벨입니다. |
| `icon` | `React.ReactNode` | — | 라벨 앞에 놓이는 24px 아이콘입니다. Figma 의 `Leading icon` 슬롯입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 선택할 수 없고 방향키 이동에서도 건너뜁니다. |
| `children` *(필수)* | `React.ReactNode` | — | 탭을 선택했을 때 표시되는 패널 내용입니다. |
| `className` | `string` | — | 패널의 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

