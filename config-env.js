const fs = require('fs');
const path = require('path');
require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const environment = argv.environment || 'dev';


const tmdbApiKey = process.env.tmdbApiKey;
const tmdbBaseUrl = process.env.tmdbBaseUrl || 'https://api.themoviedb.org/3';
const tmdbImageBaseUrl = process.env.tmdbImageBaseUrl || 'https://image.tmdb.org/t/p';


const firebaseApiKey = process.env.apiKey;
const firebaseAuthDomain = process.env.authDomain;
const firebaseProjectId = process.env.projectId;
const firebaseStorageBucket = process.env.storageBucket;
const firebaseMessagingSenderId = process.env.messagingSenderId;
const firebaseAppId = process.env.appId;

const envDir = './src/environments';


if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
}


const envDevFile = `export const environment = {
  production: false,
  tmdbApiKey: '${tmdbApiKey}',
  tmdbBaseUrl: '${tmdbBaseUrl}',
  tmdbImageBaseUrl: '${tmdbImageBaseUrl}'
};
`;


const envProdFile = `export const environment = {
  production: true,
  tmdbApiKey: '${tmdbApiKey}',
  tmdbBaseUrl: '${tmdbBaseUrl}',
  tmdbImageBaseUrl: '${tmdbImageBaseUrl}'
};
`;


const firebaseConfigFile = `import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "${firebaseApiKey}",
  authDomain: "${firebaseAuthDomain}",
  projectId: "${firebaseProjectId}",
  storageBucket: "${firebaseStorageBucket}",
  messagingSenderId: "${firebaseMessagingSenderId}",
  appId: "${firebaseAppId}"
};

const app = initializeApp(firebaseConfig);
`;


if (environment === 'prod') {
    fs.writeFileSync(`${envDir}/environment.ts`, envProdFile);
    console.log(`✅ ${envDir}/environment.ts generado (PROD)`);
} else {
    fs.writeFileSync(`${envDir}/environment.development.ts`, envDevFile);
    console.log(`✅ ${envDir}/environment.development.ts generado (DEV)`);
}


fs.writeFileSync(`${envDir}/firebase.config.ts`, firebaseConfigFile);
console.log(`✅ ${envDir}/firebase.config.ts generado`);

console.log(`\n🎉 Configuración completada para environment: ${environment}`);
