import axios from 'axios';
import fs from 'node:fs/promises';
import { EOL } from 'os';
import { createRequire } from 'module';
import { readJSON, scrubForFilename, waitForJob } from './helpers.mjs';

const require = createRequire(import.meta.url);
const profiles = require('../data/ecosystem-requests/clarity_partners/profiles/profiles.json');
const ecosystem = require('../data/ecosystem-requests/clarity_partners/clarity_partners.json');

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

  const participantProfiles = {};
  const proofRequestTemplates = [];

  let convenerDID;
  console.log('--- Creating profiles ---');

  const requests = await profiles.map(async (profile) => {
    console.log(`\t ${profile.name}`);

    try {
      const didResponse = await axios.post(didsUrl, {}, axiosHeaders);

      await waitForJob(didResponse.data.id, axiosHeaders);
      profile.did = didResponse.data.did;
      const profileResponse = await axios.post(profilesUrl, profile, axiosHeaders);
      if (profile.isParticipant) {
        participantProfiles[scrubForFilename(profile.name)] = profileResponse.data;
      }

      if (profile.isIssuer) {
          newEnvironment.DOCK_API_DID = profileResponse.data.did;
          convenerDID = profileResponse.data.did;

          if (profile.envVar) {
            newEnvironment[profile.envVar] = profileResponse.data.did;
          }
      }

      if (profile.proofRequests) {
        const allRequests = profile.proofRequests.map(async (proofRequest) => {
          const createdTemplate = await populateProofTemplate(proofRequest, profileResponse.data.did);
          proofRequestTemplates.push(createdTemplate);
        });

        await Promise.all(allRequests);
      }
    } catch (error) {
      console.error(error);
    }
  });

  try {
    await Promise.all(requests);
  } catch (error) {
    console.error(error);
  }
  return { participantProfiles, convenerDID, proofRequestTemplates };
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
      const details = await readJSON(`./data/ecosystem-requests/clarity_partners/participants/${key}.json`);
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

async function populateProofTemplate(proofTemplate, verifierDID) {
  const proofTemplateUrl = `${process.env.DOCK_API_URL}/proof-templates`;

  try {
    const proofJson = await readJSON(`./data/ecosystem-requests/clarity_partners/proof-requests/${proofTemplate}.json`);
    console.log(`\tAdding proof template: ${proofJson.name}`);
    proofJson.did = verifierDID;
    const { data: createdTemplate } = await axios.post(proofTemplateUrl, proofJson, axiosHeaders);

    const parts = proofTemplate.split('.');
    const envVar = `NEXT_PUBLIC_${parts[0]}`;
    newEnvironment[envVar] = createdTemplate.id;

    return createdTemplate;
   } catch (error) {
      console.log(error);
   }

   return null;
}

async function associateEcosystemProofRequests(ecosystem, proofTemplates) {
    const ecoProofTemplateUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystem.id}/proof-templates`;
    console.log('--- Associating proof templates ---');

    const proofRequests = await proofTemplates.map(async (proofTemplate) => {
      console.log(`\tAssociating proof template ${proofTemplate.name}`);
      await axios.post(ecoProofTemplateUrl, { id: proofTemplate.id }, axiosHeaders);
    });

    await Promise.all(proofRequests);
}

export async function setupCerts() {
  const { participantProfiles, convenerDID, proofRequestTemplates } = await createProfiles();

  const createdEcosystem = await createEcosystem(convenerDID);

  await populateEcosystemParticipants(createdEcosystem.id, participantProfiles);

  await associateEcosystemProofRequests(createdEcosystem, proofRequestTemplates);

  await writeEnvFile();
}

setupCerts();
