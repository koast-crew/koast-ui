import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import TextArea from '../TextArea/TextArea';
import Checkbox from '../Checkbox/Checkbox';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    description: 'Description',
    cancelLabel: 'Button Label',
    confirmLabel: 'Button Label',
    confirmColor: 'primary',
    footerAlign: 'end',
    showCloseButton: true,
    closeOnEscape: true,
    closeOnOverlayClick: true,
    width: 464,
  },
  argTypes: {
    title: { control: 'text', description: 'Figma **Title** 슬롯입니다.' },
    description: { control: 'text', description: 'Figma **Description** 슬롯입니다.' },
    confirmColor: {
      control: 'radio',
      options: ['primary', 'danger'],
      description: 'Figma 의 Primary button 이 인스턴스에 따라 파랑 / 빨강으로 나타납니다.',
    },
    footerAlign: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Figma 에 정렬 값이 없어 열어 둔 축입니다. 기본은 오른쪽입니다.',
    },
    width: { control: 'number' },
    open: { control: false },
    children: { control: false },
    footer: { control: false },
    initialFocusRef: { control: false },
    container: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** Figma 의 `Slot 01` / `Slot 02` (회색 면, r8, pad 16/24) 를 그대로 흉내 낸 자리 표시자입니다. */
const SlotBox = ({ height }: { height: number }) => (
  <div
    style={{ height }}
    className={'koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-tertiary koast-px-6 koast-py-4'}
  />
);

/**
 * 기본 형태입니다. 버튼을 눌러 열고 닫기 버튼 · Escape · 배경 클릭으로 닫습니다.
 * Figma 첫 번째 인스턴스(464 × 492)에 대응합니다.
 */
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant={'contained'} onClick={() => setOpen(true)}>{'모달 열기'}</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)}>
          <SlotBox height={110} />
          <SlotBox height={110} />
        </Modal>
      </>
    );
  },
};

/**
 * Figma 두 번째 인스턴스 `Create Access Group` (464 × 616) 입니다.
 * Slot group 에 입력 컴포넌트를 합성했습니다. 자식들은 16px 세로 간격으로 쌓입니다.
 */
export const CreateAccessGroup: Story = {
  args: {
    title: 'Create Access Group',
    description: 'Enter an access group name and description to create a new group.',
    cancelLabel: 'Cancel',
    confirmLabel: 'Create group',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant={'contained'} onClick={() => setOpen(true)}>{'그룹 만들기'}</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)}>
          <TextField label={'Group name'} placeholder={'Enter a group name'} />
          <TextArea label={'Description'} placeholder={'Enter a description'} />
          <Checkbox label={'Set as default group'} />
        </Modal>
      </>
    );
  },
};

/**
 * Figma 세 번째 인스턴스 `Remove Access Group` (464 × 250) 입니다.
 * Slot group 이 숨겨져 있어 본문이 Description 하나뿐이고, 주 버튼이 빨간색입니다.
 */
export const RemoveAccessGroup: Story = {
  args: {
    title: 'Remove Access Group',
    description: 'Are you sure you want to remove this access group? This action cannot be undone.',
    cancelLabel: 'Cancel',
    confirmLabel: 'Remove',
    confirmColor: 'danger',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant={'outlined'} color={'danger'} onClick={() => setOpen(true)}>{'그룹 삭제'}</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    );
  },
};

/**
 * `footer` 슬롯에 버튼을 직접 넣은 형태입니다. `confirmLabel` / `cancelLabel` 보다 우선합니다.
 * `initialFocusRef` 로 열렸을 때 포커스를 저장 버튼에 두었습니다.
 */
export const ComposedFooter: Story = {
  args: {
    title: '변경 사항 저장',
    description: '저장하지 않으면 편집 내용이 사라집니다.',
    footerAlign: 'start',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const saveRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button variant={'contained'} onClick={() => setOpen(true)}>{'모달 열기'}</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          initialFocusRef={saveRef}
          footer={(
            <>
              <Button variant={'text'} color={'secondary'} onClick={() => setOpen(false)}>{'저장하지 않고 닫기'}</Button>
              <Button ref={saveRef} variant={'contained'} onClick={() => setOpen(false)}>{'저장'}</Button>
            </>
          )}
        />
      </>
    );
  },
};

/** 본문이 길면 헤더·푸터는 남고 본문만 스크롤됩니다. 뒤 배경은 열려 있는 동안 잠깁니다. */
export const ScrollableBody: Story = {
  args: {
    title: '이용 약관',
    description: '아래 내용을 끝까지 읽고 동의해 주세요.',
    cancelLabel: '취소',
    confirmLabel: '동의',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ height: '200vh', paddingTop: '2rem' }}>
        <Button variant={'contained'} onClick={() => setOpen(true)}>{'약관 보기'}</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)}>
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index} className={'koast-m-0 koast-text-base koast-font-medium koast-leading-5 koast-text-secondary'}>
              {`제 ${ index + 1 } 조. 이 문단은 본문 스크롤을 확인하기 위한 더미 텍스트입니다.`}
            </p>
          ))}
        </Modal>
      </div>
    );
  },
};

/** Escape 와 배경 클릭을 모두 끈 형태입니다. 닫기 버튼과 버튼 스택으로만 닫힙니다. */
export const NoDismiss: Story = {
  args: {
    title: '진행 중인 작업',
    description: '작업이 끝날 때까지 닫을 수 없습니다. Escape 와 배경 클릭이 모두 꺼져 있습니다.',
    closeOnEscape: false,
    closeOnOverlayClick: false,
    showCloseButton: false,
    confirmLabel: '확인',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant={'contained'} onClick={() => setOpen(true)}>{'모달 열기'}</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} />
      </>
    );
  },
};

/** 모달이 겹쳐 열려도 배경 스크롤 잠금이 카운트되어, 안쪽 모달만 닫아도 잠금이 풀리지 않습니다. */
export const Stacked: Story = {
  args: {
    title: '첫 번째 모달',
    description: '두 번째 모달을 열어도 배경은 계속 잠겨 있어야 합니다.',
  },
  render: (args) => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);

    return (
      <div style={{ height: '200vh', paddingTop: '2rem' }}>
        <Button variant={'contained'} onClick={() => setFirst(true)}>{'모달 열기'}</Button>
        <Modal
          {...args}
          open={first}
          onClose={() => setFirst(false)}
          cancelLabel={'닫기'}
          confirmLabel={'두 번째 열기'}
          onCancel={() => setFirst(false)}
          onConfirm={() => setSecond(true)}
        />
        <Modal
          open={second}
          onClose={() => setSecond(false)}
          title={'두 번째 모달'}
          description={'이 모달만 닫아도 첫 번째 모달 때문에 배경 잠금이 유지됩니다.'}
          confirmLabel={'닫기'}
          onConfirm={() => setSecond(false)}
        />
      </div>
    );
  },
};
