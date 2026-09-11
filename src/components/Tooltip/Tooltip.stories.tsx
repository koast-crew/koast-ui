import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import type { TooltipAlign, TooltipPlacement } from './Tooltip.types';
import Button from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    content: 'Supporting text',
    placement: 'top',
    align: 'center',
    variant: 'default',
    arrow: true,
  },
  argTypes: {
    placement: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Figma **Direction** 축의 변입니다. Figma 는 화살표 기준으로 이름을 붙여 방향이 반대입니다(Figma `Below` = `top`).',
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Figma **Direction** 축의 Left/Center/Right · Top/Middle/Bottom 에 대응합니다.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'inverse'],
      description: 'Figma 의 **Style** 축입니다.',
    },
    arrow: { control: 'boolean', description: 'Figma `Direction=None` 이 false 입니다.' },
    open: { control: 'boolean', description: '지정하면 제어 컴포넌트로 동작합니다.' },
    maxWidth: { control: 'number' },
    content: { control: 'text' },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const PLACEMENTS: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];
const ALIGNS: TooltipAlign[] = ['start', 'center', 'end'];

/** 기본값입니다. 마우스를 올리거나 Tab 으로 포커스를 주면 열리고 Escape 로 닫힙니다. */
export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>{'저장'}</Button>
    </Tooltip>
  ),
};

/**
 * **placement × align** 12개 조합입니다. Figma 의 Direction 축 12개와 1:1 대응합니다.
 * 배치가 보이도록 `open` 을 켜 둔 상태입니다.
 */
export const Placements: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)',
        gap: '5rem 3rem',
        padding: '5rem 2rem',
      }}
    >
      {PLACEMENTS.flatMap((placement) =>
        ALIGNS.map((align) => (
          <div key={`${ placement }-${ align }`} style={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip {...args} open placement={placement} align={align} content={`${ placement } / ${ align }`}>
              <Button variant={'outlined'} color={'secondary'} size={'sm'}>
                {`${ placement }·${ align }`}
              </Button>
            </Tooltip>
          </div>
        )),
      )}
    </div>
  ),
};

/** **Style** 축입니다. default 는 어두운 면, inverse 는 밝은 면입니다. */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '4rem', padding: '5rem 1rem' }}>
      <Tooltip {...args} open variant={'default'} content={'Default'}>
        <Button variant={'outlined'} color={'secondary'}>{'Default'}</Button>
      </Tooltip>
      <Tooltip {...args} open variant={'inverse'} content={'Inverse'}>
        <Button variant={'outlined'} color={'secondary'}>{'Inverse'}</Button>
      </Tooltip>
    </div>
  ),
};

/** 화살표를 끈 경우입니다. Figma 의 `Direction=None` 에 해당하며 간격 8px 는 그대로 유지됩니다. */
export const WithoutArrow: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '4rem', padding: '5rem 1rem' }}>
      <Tooltip {...args} open arrow content={'화살표 있음'}>
        <Button variant={'outlined'} color={'secondary'}>{'arrow'}</Button>
      </Tooltip>
      <Tooltip {...args} open arrow={false} content={'화살표 없음'}>
        <Button variant={'outlined'} color={'secondary'}>{'none'}</Button>
      </Tooltip>
    </div>
  ),
};

/** 긴 문구는 `maxWidth`(기본 240px) 에서 줄바꿈됩니다. */
export const LongContent: Story = {
  render: (args) => (
    <div style={{ padding: '7rem 1rem 1rem' }}>
      <Tooltip
        {...args}
        open
        content={'저장: 현재 문서를 저장합니다. 저장하지 않은 변경 사항이 있으면 함께 반영됩니다.'}
      >
        <Button>{'저장'}</Button>
      </Tooltip>
    </div>
  ),
};

/** 키보드 접근성 확인용입니다. Tab 으로 포커스를 옮기면 열리고 Escape 로 닫힙니다. */
export const KeyboardAccess: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'} style={{ paddingTop: '4rem' }}>
        <Tooltip {...args} content={'첫 번째 설명'}>
          <Button variant={'outlined'} color={'secondary'}>{'첫 번째'}</Button>
        </Tooltip>
        <Tooltip {...args} content={'두 번째 설명'}>
          <Button variant={'outlined'} color={'secondary'}>{'두 번째'}</Button>
        </Tooltip>
      </div>
      <span className={'story-note'}>
        {'Tab 으로 이동하면 hover 없이도 열립니다. 열린 상태에서 Escape 를 누르면 닫힙니다.'}
      </span>
    </div>
  ),
};
