#!/usr/bin/env node

/**
 * @deprecated 1.1.0 부터 아무것도 수정하지 않고 안내만 출력합니다.
 * 자체 완결형 CSS 를 배포하므로 소비자가 tailwind.config 를 손댈 이유가 없어졌습니다.
 */

console.log(`
ℹ️  이 명령은 더 이상 필요하지 않습니다.

  @koast/ui 는 자체 완결형 CSS 를 배포하며, 스타일은 자동으로 딸려옵니다.
  tailwind.config 설정도, 별도의 CSS import 도 필요 없습니다.

    import { Button } from '@koast/ui';   // 이것만으로 스타일까지 적용됩니다

  CSS 로딩 순서를 직접 잡아야 하거나 UMD 빌드를 쓰는 경우에만
  '@koast/ui/styles.css' 를 직접 import 하세요.

  색상은 디자인 시스템의 시맨틱 토큰으로 고정되어 있습니다.
  프로젝트 brand 색상을 주입하려면 createBrandThemeCss() 를 사용하세요.
  자세한 내용: https://github.com/koast-crew/koast-ui#색상-시스템
`);
