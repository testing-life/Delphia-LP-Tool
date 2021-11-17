export const isRegistered = (
  addresses: string[],
  currentAddress: string
): boolean => !!addresses.find((address) => address === currentAddress);
