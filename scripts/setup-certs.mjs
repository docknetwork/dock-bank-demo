import axios from 'axios';
import fs from 'node:fs/promises';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
  },
};

const newEnvironment = {
  DOCK_API_TOKEN: process.env.DOCK_API_TOKEN
};

async function writeEnvFile() {
  const envFile = await fs.open('.env.new', 'a');
  try {
    Object.keys(newEnvironment).map(async (key) => {
      await envFile.appendFile(`${key}=\"${newEnvironment[key]}\"`);
    });
  } catch (error) {
    console.error('error writing env file', error);
  } finally {
    await envFile.close();
  }
}

writeEnvFile();
