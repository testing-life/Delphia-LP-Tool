export const trim = (val: string): string => {
  if (!val || typeof val !== "string" || isNaN(+val)) {
    return "";
  }

  const separatorIndex = val?.indexOf(".");

  if (separatorIndex === -1 && !Number.isInteger(+val)) {
    return "";
  }

  if (!!separatorIndex && separatorIndex + 1 === val.length) {
    return val.substring(0, val.length - 1);
  }

  if (Number.isInteger(+val)) {
    return val;
  }
  const beforeSeparatorInclusive = val.substring(0, val.indexOf(".") + 1);
  const afterSeparator = val.substring(val.indexOf(".") + 1, val.length);
  const trimmed = afterSeparator.substring(0, 5);
  return `${beforeSeparatorInclusive}${trimmed}`;
};
