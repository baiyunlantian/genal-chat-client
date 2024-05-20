// 计算指针偏移量
export default function computePointerDeviation(value: number) {
  /**
   * value区间[0, 100]
   * rotate：指针旋转角度
   * unitDeg：180 / 100，单位转动角度
   * 圆盘指针默认-90deg，转动区间[-90deg, 90deg]，指针最大转动范围：180deg(-90 到 +90)
   * */
  let unitDeg = 180 / 100;
  // 从-90deg开始转动
  let rotate = -90 + unitDeg * Math.round(value);
  let top = 31.5,
    left = 48.5;

  //以下值是经过手动测量得出仪表盘指针旋转一定角度时，自身top和left的大致偏移量
  if (value > 95) {
    top = 31.5;
    left = 38.5;
  } else if (value > 90) {
    top = 32.5;
    left = 38.5;
  } else if (value > 85) {
    top = 33.5;
    left = 39.5;
  } else if (value > 80) {
    top = 34.5;
    left = 39.5;
  } else if (value > 75) {
    top = 35.5;
    left = 39.5;
  } else if (value > 70) {
    top = 36.5;
    left = 40.5;
  } else if (value > 65) {
    top = 37.5;
    left = 41.5;
  } else if (value > 60) {
    top = 38.5;
    left = 41.5;
  } else if (value > 55) {
    top = 38.5;
    left = 42.5;
  } else if (value > 50) {
    top = 38.5;
    left = 42.5;
  } else if (value > 45) {
    top = 38.5;
    left = 43.5;
  } else if (value > 40) {
    top = 38.5;
    left = 44.5;
  } else if (value > 35) {
    top = 38.5;
    left = 45.5;
  } else if (value > 30) {
    top = 38.5;
    left = 46.5;
  } else if (value > 25) {
    top = 37.5;
    left = 46.5;
  } else if (value > 20) {
    top = 36.5;
    left = 47.5;
  } else if (value > 15) {
    top = 35.5;
    left = 48.5;
  } else if (value > 10) {
    top = 34.5;
    left = 48.5;
  } else if (value > 5) {
    top = 33.5;
    left = 48.5;
  } else if (value > 0) {
    top = 32.5;
    left = 48.5;
  }

  return {
    rotate,
    top,
    left,
  };
}
