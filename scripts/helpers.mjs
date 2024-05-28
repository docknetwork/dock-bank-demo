import fs from 'node:fs/promises';
import axios from 'axios';

export function scrubForFilename(original) {
  const match = /[\W,\\]/g;
  return original.replace(match, '_');
}

export async function readJSON(filename) {
    const contents = await fs.readFile(filename, 'utf8');
    const partDetails = JSON.parse(contents);

    return partDetails;
}

export async function waitForJob(jobId, headers, resolve, reject) {
  const JOB_WAIT_TIMEOUT = 1000;

  if (!jobId || jobId === '0') {
    return null;
  }

  if (resolve && reject) {
    const jobDataResponse = await axios.get(`${process.env.DOCK_API_URL}/jobs/${jobId}`, headers);
    const { status } = jobDataResponse.data;
    if (status === 'todo' || status === 'in_progress') {
      setTimeout(() => {
        waitForJob(jobId, headers, resolve, reject);
      }, JOB_WAIT_TIMEOUT);
      return null;
    }
    if (status === 'finalized') {
      resolve(status);
      return null;
    }

    reject(new Error(`Job ${jobId} failed with status: ${status}`));
    return null;
  }

  return new Promise((r, j) => {
    setTimeout(() => {
      waitForJob(jobId, headers, r, j);
    }, JOB_WAIT_TIMEOUT);
  });
}
