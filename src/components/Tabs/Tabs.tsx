import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TabItemProps, TabsProps } from './Tabs.types';
import {
  getTabListStyles,
  getTabPanelStyles,
  getTabStyles,
  getTabsRootStyles,
} from './Tabs.styles';

interface TabsContextValue {
  selectedValue?: string;
  tabId: (value: string) => string;
  panelId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/** 방향키 이동 대상을 고르기 위한 표식입니다. 탭 버튼에만 붙습니다. */
const TAB_SELECTOR = '[data-koast-tab]:not([disabled])';

/**
 * @koast/ui Tabs 컴포넌트의 항목입니다.
 * 탭 버튼 하나와 그에 연결된 패널 한 쌍을 이룹니다.
 * 버튼은 `Tabs` 가 탭 줄에 모아서 그리고, 이 컴포넌트는 패널만 그립니다.
 *
 * @param {string} props.value - 탭을 구분하는 값. 선택 상태의 키입니다 : string
 * @param {React.ReactNode} props.label - 탭 버튼에 표시되는 라벨 : React.ReactNode
 * @param {React.ReactNode} [props.icon] - 라벨 앞에 놓이는 24px 아이콘 : React.ReactNode
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {React.ReactNode} props.children - 탭을 선택했을 때 표시되는 패널 내용 : React.ReactNode
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <TabItem value="review" label="리뷰">
 *   리뷰 12건
 * </TabItem>
 * ```
 */
export const TabItem = ({ value, children, className = '' }: TabItemProps) => {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  const selected = ctx.selectedValue === value;

  return (
    <div
      id={ctx.panelId(value)}
      role={'tabpanel'}
      aria-labelledby={ctx.tabId(value)}
      hidden={!selected}
      tabIndex={0}
      className={getTabPanelStyles(className)}
    >
      {children}
    </div>
  );
};

/**
 * @koast/ui Tabs 컴포넌트입니다.
 * 같은 화면 안에서 여러 콘텐츠 섹션을 탭으로 나눠 전환합니다.
 * 탭 줄은 Tab 키로 한 번에 통과하고, 안에서는 ← / → 와 Home / End 로 이동합니다.
 * 이동과 동시에 해당 탭이 선택되며 비활성 탭은 건너뜁니다.
 *
 * @param {string} [props.value] - 선택된 탭의 값. 지정하면 제어 컴포넌트로 동작합니다 : string
 * @param {string} [props.defaultValue] - 비제어로 쓸 때의 초기 선택값 : string
 * @param {Function} [props.onChange] - 선택된 탭이 바뀔 때 호출되는 콜백 : Function
 * @param {string} [props.aria-label] - 탭 줄의 접근 가능한 이름 : string
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 * @param {React.ReactNode} props.children - TabItem 컴포넌트들 : React.ReactNode
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="detail" aria-label="상품 정보">
 *   <TabItem value="detail" label="설명">상품 상세 설명입니다.</TabItem>
 *   <TabItem value="review" label="리뷰">리뷰 12건</TabItem>
 * </Tabs>
 *
 * // 제어 + 아이콘 + 비활성 탭
 * <Tabs value={tab} onChange={setTab}>
 *   <TabItem value="map" label="지도" icon={<Map />}>지도</TabItem>
 *   <TabItem value="stats" label="통계" disabled>통계</TabItem>
 * </Tabs>
 * ```
 */
export const Tabs = ({
  value,
  defaultValue,
  onChange,
  className = '',
  children,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: TabsProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string | undefined>(defaultValue);

  const listRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const baseId = id ?? `koast-tabs-${ reactId }`;
  const tabId = useCallback((v: string) => `${ baseId }-tab-${ v }`, [baseId]);
  const panelId = useCallback((v: string) => `${ baseId }-panel-${ v }`, [baseId]);

  const items = useMemo(() => {
    const out: {
      value: string;
      label: React.ReactNode;
      icon?: React.ReactNode;
      disabled: boolean;
    }[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<TabItemProps>(child)) return;
      out.push({
        value: child.props.value,
        label: child.props.label,
        icon: child.props.icon,
        disabled: child.props.disabled ?? false,
      });
    });
    return out;
  }, [children]);

  // 선택값이 없으면 첫 번째 활성 탭이 선택됩니다. tablist 는 항상 하나가 선택돼 있어야 합니다.
  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const selectedValue = (isControlled ? value : innerValue) ?? firstEnabled;

  // Tab 키가 탭 줄을 한 번에 통과하도록 tabIndex=0 은 한 곳만 갖습니다.
  const focusableValue
    = items.some((item) => item.value === selectedValue && !item.disabled)
      ? selectedValue
      : firstEnabled;

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInnerValue((prev) => (prev === next ? prev : next));
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;

    const target = event.target as HTMLElement;
    if (!target.matches?.(TAB_SELECTOR)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(TAB_SELECTOR) ?? [],
    );
    if (!tabs.length) return;

    event.preventDefault();
    const current = tabs.indexOf(target as HTMLButtonElement);
    const last = tabs.length - 1;
    const nextIndex
      = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? last
          : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;

    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    nextTab.focus();
    const nextValue = nextTab.dataset.koastTab;
    if (nextValue !== undefined) select(nextValue);
  };

  const context = useMemo<TabsContextValue>(
    () => ({ selectedValue, tabId, panelId }),
    [selectedValue, tabId, panelId],
  );

  return (
    <div className={getTabsRootStyles(className)}>
      <div
        ref={listRef}
        role={'tablist'}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onKeyDown={handleKeyDown}
        className={getTabListStyles()}
      >
        {items.map((item) => {
          const selected = item.value === selectedValue;
          return (
            <button
              key={item.value}
              type={'button'}
              id={tabId(item.value)}
              role={'tab'}
              data-koast-tab={item.value}
              disabled={item.disabled}
              aria-selected={selected}
              aria-controls={panelId(item.value)}
              tabIndex={item.value === focusableValue ? 0 : -1}
              onClick={() => select(item.value)}
              className={getTabStyles(selected, item.disabled)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
    </div>
  );
};

export default Tabs;
