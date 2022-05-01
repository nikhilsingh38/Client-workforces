export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.subString(0, count) + " ...";
  }
  return str;
};
