export const ensureBuffer = (input: Buffer | string): Buffer => {
  if (typeof input === "string") {
    return Buffer.from(input, "hex");
  }
  return input;
};
