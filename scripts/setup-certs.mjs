import axios from 'axios';
import fs from 'node:fs/promises';
import { EOL } from 'os';
import { createRequire } from 'module';
import { scrubForFilename } from './helpers.mjs';

const require = createRequire(import.meta.url);
const profiles = require('./ecosystem-requests/clarity_partners_16/profiles/profiles.json');

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
  },
};

const newEnvironment = {
  DOCK_API_TOKEN: process.env.DOCK_API_TOKEN
};

async function writeEnvFile() {
  console.log('--- Writing out env vars to env.new file ---');
  const envFile = await fs.open('.env.new', 'a');
  try {
    const lines = await Object.keys(newEnvironment).map(async (key) => {
      console.log(`\t${key}`);
      await envFile.appendFile(`${key}=\"${newEnvironment[key]}\"${EOL}`);
    });

    await Promise.all(lines);
  } catch (error) {
    console.error('error writing env file', error);
  } finally {
    await envFile.close();
  }
}

async function createProfiles() {
    const didsUrl = `${process.env.DOCK_API_URL}/dids`;
    const profilesUrl = `${process.env.DOCK_API_URL}/profiles`;

    const populatedProfiles = {};

  console.log('--- Creating profiles ---');

  const requests = await profiles.map(async (profile) => {
    console.log(`\t ${profile.name}`);

    try {
    const didResponse = await axios.post(didsUrl, {}, axiosHeaders);

    console.log(JSON.stringify(didResponse.data, null, '\t'));
    profile.did = didResponse.data.did;
    const profileResponse = await axios.post(profilesUrl, profile, axiosHeaders);
    populatedProfiles[scrubForFilename(profile.name)] = profileResponse.data;
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(requests);
  console.log(JSON.stringify(populatedProfiles, null, '\t'));
  return populatedProfiles;
}

export async function setupCerts() {
  const populatedProfiles = await createProfiles();
  newEnvironment.DOCK_API_DID = populatedProfiles.Quotient_Credit_Union.did;
  await writeEnvFile();
}

setupCerts();
