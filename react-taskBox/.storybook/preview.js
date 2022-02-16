import ko from 'axe-core/locales/ko.json';

// import '@/styles/global.css';
import { GlobalStyle } from '@/styles/GlobalStyle.emotion';

// 프리뷰 → 꾸밈(decorators)
export const decorators = [
  (Story) => {
    return (
      <>
        {/* <GlobalStyle /> */}
        <Story />
      </>
    )
  }
];


export const parameters = {

  // 접근성 패널 한글 설정
  a11y: {
    config: {
      locale: ko,
    },
  },
  
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    
    // Control 패널에 개별 속성 도큐멘테이션 표시
    // 참고: https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
    expanded: true,

    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  
};