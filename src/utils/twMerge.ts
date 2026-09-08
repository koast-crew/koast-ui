import { extendTailwindMerge } from 'tailwind-merge';

/** 기본 twMerge 는 koast- 접두사 클래스를 유틸리티로 인식하지 못해 충돌을 해소하지 못합니다. */
export const twMerge = extendTailwindMerge({ prefix: 'koast-' });
