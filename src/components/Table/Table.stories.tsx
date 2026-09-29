import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal, Sparkles } from 'lucide-react';
import { Table } from './Table';
import type { TableColumn, TableRowId, TableSort } from './Table.types';
import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';

interface Member {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  joinedAt: string;
  active: boolean;
}

const MEMBERS: Member[] = [
  { id: 1, name: '김해양', email: 'ocean@koast.net', team: '예보팀', role: '관리자', joinedAt: '2024-03-02', active: true },
  { id: 2, name: '이파도', email: 'wave@koast.net', team: '관측팀', role: '편집자', joinedAt: '2023-11-15', active: true },
  { id: 3, name: '박조류', email: 'tide@koast.net', team: '예보팀', role: '뷰어', joinedAt: '2025-01-20', active: false },
  { id: 4, name: '최기상', email: 'weather@koast.net', team: '개발팀', role: '편집자', joinedAt: '2022-07-08', active: true },
  { id: 5, name: '정해류', email: 'current@koast.net', team: '관측팀', role: '뷰어', joinedAt: '2024-09-30', active: false },
  { id: 6, name: '강수온', email: 'temp@koast.net', team: '개발팀', role: '관리자', joinedAt: '2021-05-12', active: true },
];

const COLUMNS: TableColumn<Member>[] = [
  { id: 'name', label: '이름', render: (member) => member.name, sortable: true },
  { id: 'team', label: '소속', render: (member) => member.team, sortable: true },
  { id: 'role', label: '권한', render: (member) => member.role },
  { id: 'joinedAt', label: '가입일', render: (member) => member.joinedAt, sortable: true },
  {
    id: 'status',
    label: '상태',
    align: 'center',
    render: (member) => (
      <Badge shape={'text'} variant={'primary'} status={member.active ? 'neutral' : 'error'}>
        {member.active ? '활성' : '비활성'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    label: '동작',
    align: 'center',
    render: (member) => (
      <IconButton
        variant={'text'}
        color={'secondary'}
        size={'sm'}
        aria-label={`${ member.name } 추천`}
        icon={<Sparkles />}
        onClick={(event) => event.stopPropagation()}
      />
    ),
  },
  {
    id: 'menu',
    label: '메뉴',
    align: 'center',
    render: (member) => (
      <IconButton
        variant={'text'}
        color={'secondary'}
        size={'sm'}
        aria-label={`${ member.name } 메뉴`}
        icon={<MoreHorizontal />}
        onClick={(event) => event.stopPropagation()}
      />
    ),
  },
];

const sortMembers = (members: Member[], sort?: TableSort) => {
  if (!sort) return members;
  const key = sort.columnId as keyof Member;
  const sign = sort.direction === 'asc' ? 1 : -1;
  return [...members].sort((a, b) => String(a[key]).localeCompare(String(b[key])) * sign);
};

const meta: Meta<typeof Table<Member>> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    data: MEMBERS,
    columns: COLUMNS,
    getRowId: (member: Member) => member.id,
    size: 'md',
    loading: false,
    error: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'], description: '헤더 64/48px, 셀 48/40px 입니다.' },
    loading: { control: 'boolean', description: '헤더는 남기고 본문 자리에 로딩 내용을 그립니다.' },
    error: { control: 'boolean', description: '헤더는 남기고 본문 자리에 에러 메시지를 그립니다.' },
    data: { control: false },
    columns: { control: false },
    getRowId: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Table<Member>>;

/** 기본 형태입니다. 셀 내용은 `render` 가 그리므로 상태는 `Badge`, 동작은 `IconButton` 을 넣었습니다. */
export const Default: Story = {};

/** `size="sm"` 은 헤더 48px · 셀 40px 입니다. */
export const Small: Story = {
  args: { size: 'sm' },
};

/**
 * 정렬과 선택을 함께 쓴 형태입니다. 정렬 중인 헤더는 Figma `Part/Header` 의 Selected 면으로 그려지고,
 * 선택된 행은 brand 배경이 됩니다. 헤더 체크박스는 일부만 선택되면 부분 선택으로 표시됩니다.
 */
export const SortAndSelect: Story = {
  render: (args) => {
    const [sort, setSort] = useState<TableSort>({ columnId: 'name', direction: 'asc' });
    const [selectedIds, setSelectedIds] = useState<TableRowId[]>([2]);
    const data = useMemo(() => sortMembers(MEMBERS, sort), [sort]);

    return (
      <Table
        {...args}
        data={data}
        gridTemplateColumns={'2fr 1.5fr 1fr 1.5fr 1fr 80px 80px'}
        sort={sort}
        onSortChange={setSort}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    );
  },
};

/** `description` 함수를 주면 라벨 아래에 두 번째 줄이 붙습니다. */
export const WithDescription: Story = {
  args: {
    columns: [
      { id: 'name', label: '이름', render: (member) => member.name, description: (member) => member.email },
      ...COLUMNS.slice(1, 4),
    ],
  },
};

/** `onRowClick` 을 주면 행이 포커스를 받고 Enter 로도 호출됩니다. 안쪽 버튼은 전파를 막아야 행 클릭과 겹치지 않습니다. */
export const RowClick: Story = {
  render: (args) => {
    const [clicked, setClicked] = useState<string>('-');
    return (
      <div className={'story-stack'}>
        <Table {...args} onRowClick={(member) => setClicked(member.name)} />
        <p className={'story-note'}>{`마지막으로 누른 행: ${ clicked }`}</p>
      </div>
    );
  },
};

/** 로딩 · 에러 · 빈 상태입니다. 헤더는 그대로 두고 본문 자리만 바뀝니다. 문구는 prop 으로 바꿉니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <Table {...args} loading />
      <Table {...args} error errorContent={'회원 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'} />
      <Table {...args} data={[]} emptyContent={'등록된 회원이 없습니다.'} />
    </div>
  ),
};
