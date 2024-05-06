import axios from 'axios';
import fs from 'node:fs/promises';

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

downloadProofRequests();
