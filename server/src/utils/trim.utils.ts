export const trimObjectValues = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const trimmedObj = { ...obj };
  Object.keys(trimmedObj).forEach((key) => {
    if (typeof trimmedObj[key] === 'string') {
      trimmedObj[key] = trimmedObj[key].trim();
    }
  });
  return trimmedObj;
};
