/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/koast-ui/dist/style.css',
		'./index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './dev/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
    '!./node_modules',
  ],
  theme: {
    extend: {
    },
  },
  // safelist: [
  //   // 버튼 관련 클래스들을 safelist에 추가
  //   'font-semibold', 'transition-all', 'duration-200', 'rounded', 'focus:outline-none', 'inline-flex', 'items-center', 'justify-center',
  //   // 크기 클래스
  //   'text-xs', 'px-2', 'py-1', 'gap-1',
  //   'text-sm', 'px-3', 'py-1.5', 'gap-1.5',
  //   'text-base', 'px-4', 'py-2', 'gap-2',
  //   'text-lg', 'px-5', 'py-2.5',
  //   'text-xl', 'px-6', 'py-3', 'gap-2.5',
  //   // 색상 클래스 (모든 변형)
  //   {
  //     pattern: /(bg|text|border|hover:bg|active:bg)-(blue|purple|green|red|amber|sky|gray|white)-(50|100|300|600|700|800)/,
  //   },
  //   // 기타 유틸리티 클래스
  //   'opacity-50', 'cursor-not-allowed', 'pointer-events-none',
  //   'relative', 'absolute', 'inset-0', 'flex',
  //   'size-5', 'animate-spin', 'opacity-25', 'opacity-75',
  //   'shadow-lg', 'w-full',
    
  //   // Select 컴포넌트 관련 클래스 추가
  //   'inline-block', 'min-w-64', 'transition-colors', 'duration-200',
  //   'hover:border-gray-400', 'bg-gray-50', 'grow', 'truncate', 'text-gray-400',
  //   'ml-1.5', 'text-red-500', 'ml-2', 'rotate-180', 'transition-transform',
  //   'z-10', 'mt-1', 'max-h-60', 'overflow-auto', 'shadow-lg',
  //   'bg-blue-50', 'text-blue-800', 'border-b', 'rounded-none', 'bg-transparent', 'border-none',
  //   'border-red-500', 'justify-between', 'cursor-pointer', 'bg-white', 'border-gray-300'
  // ],
  plugins: [],
};

