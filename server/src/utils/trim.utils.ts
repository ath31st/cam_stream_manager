export const trimObjectValues = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const trimmedObj = { ...obj };

  for (const key of Object.keys(trimmedObj)) {
    if (typeof trimmedObj[key] === 'string') {
      trimmedObj[key] = (trimmedObj[key] as string).trim();
    }
  }

  return trimmedObj;
};
