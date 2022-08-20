export const drawNear = (src: number, dest: number, inc: number) => {
  let newNum = src + (src > dest ? -1 : 1) * inc;
  const [a, b] = [src, newNum].sort();

  if (a <= dest && dest <= b) newNum = dest;

  return newNum;
};

export const limitAbs = (v: number, limit: number) => {
  if (v > limit) return limit;
  if (v < -limit) return -limit;

  return v;
};
