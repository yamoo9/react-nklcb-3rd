import { hex2rgba } from './hex2rgba';

test(`hex2rgba('#333', 0.56) => rgba(51,51,51, 0.56)`, () => {
  expect(hex2rgba('#333', 0.56).replace(/\s+/g, '')).toBe('rgba(51,51,51,0.56)');
});

test(`hex2rgba(333333, '92%') => rgba(51,51,51, 0.92)`, () => {
  expect(hex2rgba(333333, '92%').replace(/\s+/g, '')).toBe('rgba(51,51,51,0.92)');
});

test(`hex2rgba('#f8b', 0.345, true) => "rgba(255 136 187 / 34.5%)"`, () => {
  expect(hex2rgba('#f8b', 0.345, true)).toBe('rgba(255 136 187 / 34.5%)');
})