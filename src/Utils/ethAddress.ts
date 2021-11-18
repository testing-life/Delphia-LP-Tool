export const isRegistered = (
  addresses: string[],
  currentAddress: string
): boolean => {
  console.log(`typeof addresses`, typeof addresses, typeof currentAddress);
  return addresses.includes(currentAddress);
};
