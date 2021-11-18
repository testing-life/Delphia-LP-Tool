export const isRegistered = (
  addresses: string[],
  currentAddress: string
): boolean => {
  return addresses.includes(currentAddress);
};
