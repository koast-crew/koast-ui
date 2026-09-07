import { KOAST_BRAND_STEPS, type KoastBrandStep, type KoastBrandTone } from '../styles/tokens/tokens.generated';

/** brand 램프 한 벌입니다. 50~900 열 단계를 hex 문자열로 모두 채워야 합니다. */
export type KoastBrandRamp = Record<KoastBrandStep, string>;

/** 라이트/다크 각각에 적용할 brand 램프입니다. */
export interface KoastBrandTheme {
  /** 라이트 모드 램프입니다. `primary` 는 필수입니다. */
  light: { primary: KoastBrandRamp, secondary?: KoastBrandRamp };
  /** 다크 모드 램프입니다. 생략하면 라이트 값을 씁니다. 램프가 같아도 참조 단계가 달라 결과 색은 다릅니다. */
  dark?: { primary?: KoastBrandRamp, secondary?: KoastBrandRamp };
}

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/** hex 문자열을 Tailwind 불투명도 수식어와 호환되는 `R G B` 채널 표기로 변환합니다. */
const hexToChannels = (hex: string, context: string): string => {
  if (!HEX_PATTERN.test(hex)) {
    throw new Error(`[@koast/ui] ${ context } 의 값 '${ hex }' 는 올바른 hex 색상이 아닙니다. '#2563eb' 형식으로 입력해주세요.`);
  }
  const body = hex.slice(1);
  const full = body.length === 3 ? body.split('').map((c) => c + c).join('') : body;
  const value = parseInt(full, 16);
  return `${ (value >> 16) & 255 } ${ (value >> 8) & 255 } ${ value & 255 }`;
};

const rampToDeclarations = (tone: KoastBrandTone, ramp: KoastBrandRamp): string[] => {
  return KOAST_BRAND_STEPS.map((step) => {
    const hex = ramp[step];
    if (hex === undefined) {
      throw new Error(`[@koast/ui] brand.${ tone } 램프에 '${ step }' 단계가 없습니다. 50~900 열 단계를 모두 지정해주세요.`);
    }
    return `--koast-brand-${ tone }-${ step }: ${ hexToChannels(hex, `brand.${ tone }.${ step }`) };`;
  });
};

const collectDeclarations = (
  ramps: { primary?: KoastBrandRamp, secondary?: KoastBrandRamp },
): string[] => {
  const declarations: string[] = [];
  if (ramps.primary) declarations.push(...rampToDeclarations('primary', ramps.primary));
  if (ramps.secondary) declarations.push(...rampToDeclarations('secondary', ramps.secondary));
  return declarations;
};

/**
 * brand 색상을 주입하는 CSS 문자열을 만듭니다. 전역 스타일에 삽입해 사용합니다.
 * 시맨틱 토큰은 라이브러리가 고정하므로 프로젝트가 바꿀 수 있는 건 brand 램프뿐입니다.
 */
export const createBrandThemeCss = (theme: KoastBrandTheme): string => {
  const lightDeclarations = collectDeclarations(theme.light);
  const darkDeclarations = theme.dark ? collectDeclarations(theme.dark) : [];

  const blocks = [
    `:root {\n${ lightDeclarations.map((d) => `  ${ d }`).join('\n') }\n}`,
  ];

  if (darkDeclarations.length > 0) {
    const body = darkDeclarations.map((d) => `  ${ d }`).join('\n');
    blocks.push(`[data-koast-theme='dark'] {\n${ body }\n}`);
    blocks.push(
      `@media (prefers-color-scheme: dark) {\n  :root:not([data-koast-theme='light']) {\n${
        darkDeclarations.map((d) => `    ${ d }`).join('\n')
      }\n  }\n}`,
    );
  }

  return `${ blocks.join('\n\n') }\n`;
};

/** brand 램프를 인라인 `style` 객체로 만듭니다. 특정 하위 트리에만 적용할 때 씁니다. */
export const createBrandThemeStyle = (
  ramps: { primary?: KoastBrandRamp, secondary?: KoastBrandRamp },
): Record<string, string> => {
  const style: Record<string, string> = {};
  collectDeclarations(ramps).forEach((declaration) => {
    const separator = declaration.indexOf(':');
    style[declaration.slice(0, separator)] = declaration.slice(separator + 1, -1).trim();
  });
  return style;
};
