import axios from 'axios';
import fs from 'node:fs/promises';
import { scrubForFilename } from './helpers.mjs';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
  },
};

const templatesToDownload = [{
  templateId: process.env.NEXT_PUBLIC_BANK_IDENDITY_TEMPLATE_ID,
  name: 'BANK_IDENDITY_TEMPLATE_ID'
},
  {
    templateId: process.env.NEXT_PUBLIC_FORSUR_PROOF_TEMPLATE_ID,
    name: 'FORSUR_PROOF_TEMPLATE_ID'
  },
{
  templateId: process.env.NEXT_PUBLIC_FORSUR_VERIFICATION_PROOF_TEMPLATE_ID,
  name: 'FORSUR_VERIFICATION_PROOF_TEMPLATE_ID'
  },
{
  templateId: process.env.NEXT_PUBLIC_QUOTIENT_LOAN_PROOF_TEMPLATE_ID,
  name: 'QUOTIENT_LOAN_PROOF_TEMPLATE_ID'
  },
{
  templateId: process.env.NEXT_PUBLIC_URBANSCAPE_BANKBIO_TEMPLATE_ID,
  name: 'URBANSCAPE_BANKBIO_TEMPLATE_ID'
  },
{
  templateId: process.env.NEXT_PUBLIC_URBANSCAPE_CREDITSCORE_TEMPLATE_ID,
  name: 'URBANSCAPE_CREDITSCORE_TEMPLATE_ID'
  },
];

export async function downloadEcosystems() {
  console.log('--- Downloading ecosystems from Certs ---');

  const ecosystemsUrl = `${process.env.DOCK_API_URL}/trust-registries/`;
      const ecosystemsResponse = await axios.get(ecosystemsUrl, axiosHeaders);

  ecosystemsResponse.data.map(async (ecosystem) => {
    try {
      console.log(`\tDownloading ecosystem: ${ecosystem.name}`);
      const filename = scrubForFilename(ecosystem.slug);
      const folder = `scripts/ecosystem-requests/${filename}`;
      await fs.mkdir(folder);
      await fs.writeFile(`${folder}/${filename}.json`, JSON.stringify(ecosystem, null, '\t'));

      const participantsFolder = `${folder}/participants`;
      await fs.mkdir(participantsFolder);
      await downloadParticipants(ecosystem.id, participantsFolder);

      const schemasFolder = `${folder}/schemas`;
      await fs.mkdir(schemasFolder);
      await downloadSchemas(ecosystem.id, schemasFolder);

      const proofTemplatesFolder = `${folder}/proof-templates`;
      await fs.mkdir(proofTemplatesFolder);
      await downloadProofRequestTemplates(ecosystem.id, proofTemplatesFolder);
    } catch (error) {
      console.log(error);
    }
  });
}

async function downloadParticipants(ecosystemId, folder) {
  console.log('\t--- Downloading participants ---');

  const ecosystemsUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystemId}/participants`;
  const ecosystemsResponse = await axios.get(ecosystemsUrl, axiosHeaders);

  ecosystemsResponse.data.list.map(async (participant) => {
    try {
      console.log(`\t\tDownloading participant: ${participant.name}`);
      const filename = scrubForFilename(participant.name);
      await fs.writeFile(`${folder}/${filename}.json`, JSON.stringify(participant, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  });
}

async function downloadSchemas(ecosystemId, folder) {
  console.log('\t--- Downloading schemas ---');

  const ecosystemsUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystemId}/schemas`;
  const ecosystemsResponse = await axios.get(ecosystemsUrl, axiosHeaders);

  ecosystemsResponse.data.list.map(async (schema) => {
    try {
      console.log(`\t\tDownloading schema: ${schema.name}`);
      const filename = scrubForFilename(schema.name);
      await fs.writeFile(`${folder}/${filename}.json`, JSON.stringify(schema, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  });
}

async function downloadProofRequestTemplates(ecosystemId, folder) {
  console.log('\t--- Downloading proof request templates ---');

  const ecosystemsUrl = `${process.env.DOCK_API_URL}/trust-registries/${ecosystemId}/proof-templates`;
  const ecosystemsResponse = await axios.get(ecosystemsUrl, axiosHeaders);

  ecosystemsResponse.data.list.map(async (proofTemplate) => {
    try {
      console.log(`\t\tDownloading proof request template: ${proofTemplate.name}`);
      const filename = scrubForFilename(proofTemplate.name);
      await fs.writeFile(`${folder}/${filename}.json`, JSON.stringify(proofTemplate, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  });
}

export function downloadProofRequests() {
  console.log('--- Downloading proof request templates from Certs ---');

  const proofTemplateUrl = `${process.env.DOCK_API_URL}/proof-templates/`;

  templatesToDownload.map(async (template) => {
    try {
      console.log(`Downloading proof request template: ${template.name}`);
      const templateUrl = `${proofTemplateUrl}${template.templateId}`;
      const templateResponse = await axios.get(templateUrl, axiosHeaders);
      await fs.writeFile(`scripts/proof-requests/${template.name}.json`, JSON.stringify(templateResponse.data, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  });
}

if (!process.env.DOCK_API_TOKEN) {
  throw new Error("Please configure the DOCK_API_TOKEN setting in the project's .env file.");
}

downloadEcosystems();
// downloadProofRequests();
