import React from 'react';
import { MapLegendProps, BarLegendData, CircleLegendData } from './MapLegend.types';
import {
  getLegendContainerStyles,
  getLegendButtonStyles,
  getLegendColorItemStyles,
} from './MapLegend.styles';

/**
 * 범례 바 컴포넌트입니다.
 */
const LegendBar = ({ legendData }: { legendData: BarLegendData }) => {
  return (
    <>
      <div className={'flex w-full px-[18px]'}>
        {legendData.colors.map((color, index) => (
          <span
            key={`${ color }-${ index }`}
            className={getLegendColorItemStyles(index === 0, index === legendData.colors.length - 1)}
            style={{
              backgroundColor: color,
              opacity: legendData.opacity ?? 1,
            }}
          />
        ))}
      </div>
      <div className={'flex w-full justify-between'}>
        {legendData.values.map((value, index) => (
          <span key={`${ value }-${ index }`} className={'w-10 text-center text-[12px]'}>
            {value}
          </span>
        ))}
      </div>
    </>
  );
};

/**
 * 개별 범례 항목 컴포넌트입니다.
 */
const LegendItems = ({ legendItems }: { legendItems: CircleLegendData[] }) => {
  return (
    <div className={'flex items-center'}>
      {legendItems.map((item, index) => (
        <div key={`${ item.color }-${ index }`} className={'flex flex-1 items-center gap-1'}>
          <span
            className={'size-5 rounded-full'}
            style={{
              backgroundColor: item.color,
              opacity: item.opacity ?? 1,
            }}
          />
          <span className={'shrink-0'}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * 지도 범례 컴포넌트입니다.
 *
 * @param {string} [props.title='범례'] - 범례 제목입니다. 타입 : string, 기본값 : '범례'
 * @param {ToolbarButton[]} props.toolbarButtons - 툴바 버튼 배열의 배열입니다. 타입 : ToolbarButton[]
 * @param {Record<string, BarLegendData | CircleLegendData[]>} props.legendData - 범례 데이터를 포함하는 객체입니다. 타입 : Record<string, BarLegendData | CircleLegendData[]>
 * @param {string} props.selectedLayerId - 현재 선택된 레이어 ID입니다. 타입 : string
 * @param {LegendType} [props.legendType='bar'] - 범례 표시 타입입니다. 타입 : 'bar' | 'circle', 기본값 : 'bar'
 * @param {Function} [props.onLayerSelect] - 레이어 선택 시 호출될 함수입니다. 타입 : Function
 * @param {Function} [props.onClose] - 범례 닫기 버튼 클릭 시 호출될 함수입니다. 타입 : Function
 * @param {boolean} [props.visible=true] - 범례의 표시 여부를 결정합니다. 타입 : boolean, 기본값 : true
 * @param {string} [props.className] - 범례 컨테이너에 추가할 CSS 클래스명입니다. 타입 : string, 기본값 : ''
 * @param {string[]} [props.excludeButtonIds=[]] - 필터링할 버튼 ID 배열입니다. 타입 : string[], 기본값 : []
 *
 * @example
 * ```tsx
 * <MapLegend
 *   visible={true}
 *   onClose={() => setLegendVisible(false)}
 *   selectedLayerId="초기값id"
 *   onLayerSelect={(id) => setSelectedLayer(id)}
 *   toolbarButtons={toolbarButtons}
 *   legendData={legendData}
 *   legendType="bar"
 * />
 * ```
 */
export const MapLegend = (props: MapLegendProps) => {
  const {
    title = '범례',
    toolbarButtons,
    legendData,
    selectedLayerId,
    legendType = 'bar',
    onLayerSelect,
    onClose,
    visible = true,
    className = '',
    excludeButtonIds = [],
  } = props;
  // 범례가 보이지 않으면 null 반환
  if (!visible) return null;

  // 제외할 버튼 ID 집합 생성
  const excludeSet = new Set(excludeButtonIds);

  // 현재 선택된 레이어의 범례 데이터
  const currentLegendData = legendData[selectedLayerId];

  // 범례 데이터 렌더링
  const renderLegend = () => {
    if (!currentLegendData) return null;

    if (legendType === 'bar' && 'colors' in currentLegendData && 'values' in currentLegendData) {
      return <LegendBar legendData={currentLegendData as BarLegendData} />;
    } else if (legendType === 'circle' && Array.isArray(currentLegendData)) {
      return <LegendItems legendItems={currentLegendData as CircleLegendData[]} />;
    }

    console.log('Legend type or data mismatch:', { legendType, currentLegendData });
    return null;
  };

  return (
    <div className={getLegendContainerStyles(className)}>
      <div className={'flex h-8 w-full items-center justify-between font-bold'}>
        <span>{title}</span>
        {onClose && (
          <button
            type={'button'}
            onClick={onClose}
            aria-label={'Close legend'}
          >
            <svg
              xmlns={'http://www.w3.org/2000/svg'}
              width={'16'}
              height={'16'}
              viewBox={'0 0 24 24'}
              fill={'none'}
              stroke={'currentColor'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
            >
              <line x1={'18'} y1={'6'} x2={'6'} y2={'18'} />
              <line x1={'6'} y1={'6'} x2={'18'} y2={'18'} />
            </svg>
          </button>
        )}
      </div>
      <div className={'flex flex-col gap-2 pt-2 text-sm'}>
        <div className={'flex flex-wrap gap-2'}>
          {toolbarButtons
            .flat()
            .filter((btn) => !excludeSet.has(btn.id))
            .map((btn) => (
              <button
                key={btn.id}
                className={getLegendButtonStyles(selectedLayerId === btn.id)}
                onClick={() => onLayerSelect?.(btn.id)}
                aria-pressed={selectedLayerId === btn.id}
              >
                {btn.icon && <span className={'inline-flex'}>{btn.icon}</span>}
                <span>{btn.label}</span>
              </button>
            ))}
        </div>
        <div className={'mt-2 flex w-full flex-col gap-2'}>
          {renderLegend()}
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
