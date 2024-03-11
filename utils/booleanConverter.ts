export const stringToBoolean = (data: string) => {
  return data === "Yes" ? true : false;
};

export const booleanToString = (data: boolean) => {
  return data ? "Yes" : "No";
};
