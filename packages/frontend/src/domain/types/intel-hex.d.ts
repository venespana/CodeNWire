declare module 'intel-hex' {
  export function parse(
    data: string | ArrayBuffer,
    bufferSize?: number,
    addressOffset?: number
  ): {
    data: Uint8Array;
    startSegmentAddress: number | null;
    startLinearAddress: number | null;
  };
}
