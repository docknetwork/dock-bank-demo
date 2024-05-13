export function scrubForFilename(original) {
  const match = /[\W,\\]/g;
  return original.replace(match, '_');
}
