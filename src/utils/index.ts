export const truncateMiddle = (
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr = '…',
): string => {
  if (str === null) {
    return ''
  }

  const strLen = str.length
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
  }
}