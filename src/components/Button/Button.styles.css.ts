import { style, keyframes } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

/**
 * 디자인 토큰 정의
 */
const tokens = {
  colors: {
    primary: {
      main: '#2563eb',
      hover: '#1d4ed8',
      active: '#1e40af',
      light: '#eff6ff',
      lighter: '#dbeafe',
    },
    secondary: {
      main: '#7c3aed',
      hover: '#6d28d9',
      active: '#5b21b6',
      light: '#faf5ff',
      lighter: '#f3e8ff',
    },
    success: {
      main: '#059669',
      hover: '#047857',
      active: '#065f46',
      light: '#ecfdf5',
      lighter: '#d1fae5',
    },
    error: {
      main: '#dc2626',
      hover: '#b91c1c',
      active: '#991b1b',
      light: '#fef2f2',
      lighter: '#fecaca',
    },
    warning: {
      main: '#d97706',
      hover: '#b45309',
      active: '#92400e',
      light: '#fffbeb',
      lighter: '#fef3c7',
    },
    info: {
      main: '#0284c7',
      hover: '#0369a1',
      active: '#075985',
      light: '#f0f9ff',
      lighter: '#e0f2fe',
    },
    gray: {
      main: '#4b5563',
      hover: '#374151',
      active: '#1f2937',
      light: '#f9fafb',
      lighter: '#f3f4f6',
    },
  },
  spacing: {
    xs: '4px 8px',
    sm: '6px 12px',
    md: '8px 16px',
    lg: '10px 20px',
    xl: '12px 24px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  gap: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '8px',
    xl: '10px',
  },
  borderRadius: '6px',
};

// 스핀 애니메이션 정의
const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const spin = style({
  animationName: spinAnimation,
  animationDuration: '1s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
});

/**
 * 버튼 레시피 정의
 */
export const buttonRecipe = recipe({
  base: {
    fontWeight: 600,
    transition: 'all 200ms ease-in-out',
    borderRadius: tokens.borderRadius,
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',

    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
    },

    ':active': {
      transform: 'translateY(1px)',
    },
  },

  variants: {
    variant: {
      text: {},
      contained: {},
      outlined: {},
    },

    color: {
      primary: {},
      secondary: {},
      success: {},
      error: {},
      warning: {},
      info: {},
      gray: {},
    },

    size: {
      xs: {
        fontSize: tokens.fontSize.xs,
        padding: tokens.spacing.xs,
        gap: tokens.gap.xs,
      },
      sm: {
        fontSize: tokens.fontSize.sm,
        padding: tokens.spacing.sm,
        gap: tokens.gap.sm,
      },
      md: {
        fontSize: tokens.fontSize.md,
        padding: tokens.spacing.md,
        gap: tokens.gap.md,
      },
      lg: {
        fontSize: tokens.fontSize.lg,
        padding: tokens.spacing.lg,
        gap: tokens.gap.lg,
      },
      xl: {
        fontSize: tokens.fontSize.xl,
        padding: tokens.spacing.xl,
        gap: tokens.gap.xl,
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',

        ':active': {
          transform: 'none',
        },
      },
    },

    loading: {
      true: {
        position: 'relative',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },

    shadow: {
      true: {},
    },
  },

  compoundVariants: [
    // Primary color variants
    {
      variants: { variant: 'text', color: 'primary' },
      style: {
        color: tokens.colors.primary.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.primary.light,
        },

        ':active': {
          backgroundColor: tokens.colors.primary.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'primary' },
      style: {
        backgroundColor: tokens.colors.primary.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.primary.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.primary.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'primary' },
      style: {
        color: tokens.colors.primary.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.primary.main }`,

        ':hover': {
          backgroundColor: tokens.colors.primary.light,
        },

        ':active': {
          backgroundColor: tokens.colors.primary.lighter,
        },
      },
    },

    // Secondary color variants
    {
      variants: { variant: 'text', color: 'secondary' },
      style: {
        color: tokens.colors.secondary.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.secondary.light,
        },

        ':active': {
          backgroundColor: tokens.colors.secondary.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'secondary' },
      style: {
        backgroundColor: tokens.colors.secondary.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.secondary.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.secondary.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'secondary' },
      style: {
        color: tokens.colors.secondary.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.secondary.main }`,

        ':hover': {
          backgroundColor: tokens.colors.secondary.light,
        },

        ':active': {
          backgroundColor: tokens.colors.secondary.lighter,
        },
      },
    },

    // Success color variants
    {
      variants: { variant: 'text', color: 'success' },
      style: {
        color: tokens.colors.success.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.success.light,
        },

        ':active': {
          backgroundColor: tokens.colors.success.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'success' },
      style: {
        backgroundColor: tokens.colors.success.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.success.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.success.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'success' },
      style: {
        color: tokens.colors.success.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.success.main }`,

        ':hover': {
          backgroundColor: tokens.colors.success.light,
        },

        ':active': {
          backgroundColor: tokens.colors.success.lighter,
        },
      },
    },

    // Error color variants
    {
      variants: { variant: 'text', color: 'error' },
      style: {
        color: tokens.colors.error.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.error.light,
        },

        ':active': {
          backgroundColor: tokens.colors.error.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'error' },
      style: {
        backgroundColor: tokens.colors.error.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.error.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.error.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'error' },
      style: {
        color: tokens.colors.error.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.error.main }`,

        ':hover': {
          backgroundColor: tokens.colors.error.light,
        },

        ':active': {
          backgroundColor: tokens.colors.error.lighter,
        },
      },
    },

    // Warning color variants
    {
      variants: { variant: 'text', color: 'warning' },
      style: {
        color: tokens.colors.warning.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.warning.light,
        },

        ':active': {
          backgroundColor: tokens.colors.warning.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'warning' },
      style: {
        backgroundColor: tokens.colors.warning.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.warning.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.warning.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'warning' },
      style: {
        color: tokens.colors.warning.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.warning.main }`,

        ':hover': {
          backgroundColor: tokens.colors.warning.light,
        },

        ':active': {
          backgroundColor: tokens.colors.warning.lighter,
        },
      },
    },

    // Info color variants
    {
      variants: { variant: 'text', color: 'info' },
      style: {
        color: tokens.colors.info.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.info.light,
        },

        ':active': {
          backgroundColor: tokens.colors.info.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'info' },
      style: {
        backgroundColor: tokens.colors.info.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.info.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.info.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'info' },
      style: {
        color: tokens.colors.info.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.info.main }`,

        ':hover': {
          backgroundColor: tokens.colors.info.light,
        },

        ':active': {
          backgroundColor: tokens.colors.info.lighter,
        },
      },
    },

    // Gray color variants
    {
      variants: { variant: 'text', color: 'gray' },
      style: {
        color: tokens.colors.gray.main,
        backgroundColor: 'transparent',

        ':hover': {
          backgroundColor: tokens.colors.gray.light,
        },

        ':active': {
          backgroundColor: tokens.colors.gray.lighter,
        },
      },
    },
    {
      variants: { variant: 'contained', color: 'gray' },
      style: {
        backgroundColor: tokens.colors.gray.main,
        color: 'white',

        ':hover': {
          backgroundColor: tokens.colors.gray.hover,
        },

        ':active': {
          backgroundColor: tokens.colors.gray.active,
        },
      },
    },
    {
      variants: { variant: 'outlined', color: 'gray' },
      style: {
        color: tokens.colors.gray.main,
        backgroundColor: 'transparent',
        border: `1px solid ${ tokens.colors.gray.main }`,

        ':hover': {
          backgroundColor: tokens.colors.gray.light,
        },

        ':active': {
          backgroundColor: tokens.colors.gray.lighter,
        },
      },
    },

    // Shadow effect for contained buttons
    {
      variants: { variant: 'contained', shadow: true },
      style: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

        ':hover': {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  ],
});

/**
 * 로딩 스피너 스타일
 */
export const loadingSpinner = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const spinnerIcon = style([
  spin,
  {
    width: '20px',
    height: '20px',
  },
]);

/**
 * 아이콘 컨테이너 스타일
 */
export const iconContainer = style({
  display: 'inline-flex',
});

/**
 * 버튼 변형 타입
 */
export type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;