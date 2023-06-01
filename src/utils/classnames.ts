export const classNames = (...names: (string | boolean)[]) =>
  names.filter((name) => name).join(" ");
