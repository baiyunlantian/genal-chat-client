export const getFontSize = (v = 1) => {
  if (document.body.clientWidth > 5500) {
    return 36 * v;
  }
  if (document.body.clientWidth > 3000) {
    return 24.5 * v;
  }
  return 12 * v;
};
