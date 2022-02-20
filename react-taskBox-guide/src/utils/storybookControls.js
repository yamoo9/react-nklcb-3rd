export const rangeControl = ({ min = 12, step = 1, max = 100 } = {}) => ({
  control: {
    type: 'range',
    min,
    step,
    max,
  },
});

export const selectControl = (options) => ({
  control: {
    type: 'select',
    options,
  },
});
