import axios from 'axios';
import fs from 'node:fs/promises';
import { EOL } from 'os';
import { createRequire } from 'module';
import { readJSON, scrubForFilename } from './helpers.mjs';

const require = createRequire(import.meta.url);
const profiles = require('./ecosystem-requests/clarity_partners_16/profiles/profiles.json');
const ecosystem = require('./ecosystem-requests/clarity_partners_16/clarity_partners_16.json');

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
  },
};

const newEnvironment = {
  DOCK_API_TOKEN: process.env.DOCK_API_TOKEN,
  DOCK_API_URL: process.env.DOCK_API_URL,
  NEXT_PUBLIC_DOCK_API_URL: process.env.DOCK_API_URL
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

      profile.did = didResponse.data.did;
      const profileResponse = await axios.post(profilesUrl, profile, axiosHeaders);
      populatedProfiles[scrubForFilename(profile.name)] = profileResponse.data;
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(requests);
  return populatedProfiles;
}

async function createEcosystem(adminDID) {
    const ecosystemUrl = `${process.env.DOCK_API_URL}/trust-registries`;

    console.log('--- Creating ecosystem ---');

    // update details
    ecosystem.convener = adminDID;

    try {
     const ecoResponse = await axios.post(ecosystemUrl, ecosystem, axiosHeaders);

      return ecoResponse.data;
    } catch (error) {
      console.error(error);
      return null;
    }
}

async function populateEcosystemParticipants(ecosystemId, participants) {
    const inviteUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystemId}/participants`;
    const acceptUrl = `${process.env.DOCK_API_URL}/trust-registries/invitations/accept`;
    
    console.log('--- Inviting ecosystem participants ---');
    const participantRequests = await Object.keys(participants).map(async (key) => {
    try {
      const participant = participants[key];
      console.log(`\t${participant.name}`);
      // get participant details from file
      const details = await readJSON(`./scripts/ecosystem-requests/clarity_partners_16/participants/${key}.json`);
      details.did = participant.did;

      // create invite
      const inviteBody = {
        issuerSchemas: details.issuerSchemas,
        verifierSchemas: details.verifierSchemas
      };
     const inviteResponse = await axios.post(inviteUrl, inviteBody, axiosHeaders);

     // auto accept the invite
     // NOTE: this should never be done in a production system - the participant should accept the invite
     // themselves by clicking on the link
        const inviteToken = inviteResponse.data.link.split('?token=')[1];
        details.token = inviteToken;

        const { data: acceptResult } = await axios.post(
          acceptUrl,
          details,
          axiosHeaders
        );

      return acceptResult;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  await Promise.all(participantRequests);
}

async function populateProofTemplates(ecosystem) {
  const proofTemplates = await fs.readdir('./scripts/ecosystem-requests/clarity_partners_16/proof-templates');

  console.log('--- Adding proof request templates ---');
  const proofTemplateUrl = `${process.env.DOCK_API_URL}/proof-templates`;
  const ecoProofTemplateUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystem.id}/proof-templates`;
  const templateRequests = await proofTemplates.map(async (proofTemplate) => {
    const proofJson = await readJSON(proofTemplate);
    console.log(`\t${proofJson.name}`);
    proofJson.did = ecosystem.convener;
    const { data: createdTemplate } = await axios.post(proofTemplateUrl, proofJson, axiosHeaders);

    newEnvironment[proofTemplate] = createdTemplate.id;

    await axios.post(ecoProofTemplateUrl, { id: createdTemplate.id }, axiosHeaders);
  });

  await Promise.all(templateRequests);
}

export async function setupCerts() {
  const populatedProfiles = await createProfiles();
  newEnvironment.DOCK_API_DID = populatedProfiles.Quotient_Credit_Union.did;

  const createdEcosystem = await createEcosystem(populatedProfiles.Quotient_Credit_Union.did);

  await populateEcosystemParticipants(createdEcosystem.id, populatedProfiles);

  await populateProofTemplates(createdEcosystem);

  await writeEnvFile();
}

setupCerts();
