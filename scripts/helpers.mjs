import fs from 'node:fs/promises';

export function scrubForFilename(original) {
  const match = /[\W,\\]/g;
  return original.replace(match, '_');
}

export async function readJSON(filename) {
    const contents = await fs.readFile(filename, 'utf8');
    const partDetails = JSON.parse(contents);

    return partDetails;
}
