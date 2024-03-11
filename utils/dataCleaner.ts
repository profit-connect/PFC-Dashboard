export function cleanObjectL1(obj: {
  [key: string]: null | undefined | any[];
}): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value !== null &&
      value !== undefined &&
      (Array.isArray(value) ? value.length > 0 : true)
    ) {
      result[key] = value;
    }
  }

  return result;
}

export function removeObjectKeys(obj: any, keysToRemove: string[]): any {
  const newObj: any = { ...obj };

  keysToRemove.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
}
