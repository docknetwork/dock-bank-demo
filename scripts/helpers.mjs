import fs from 'node:fs/promises';

export function scrubForFilename(original) {
  const match = /[\W,\\]/g;
  return original.replace(match, '_');
}

export async function readJSON(filename) {
    let partDetails;
    await fs.readFile(filename, 'utf8', (err, data) => {
      if (err) throw err;
      partDetails = JSON.parse(data);
    });

    return partDetails;
}
