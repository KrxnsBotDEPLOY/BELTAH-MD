const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEN4Q2lLSy9aWWJMTW5tZXo2eVAxY3N0YlVrbkhMaDdKNCthNW1sZlMzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXBUcDFTM1dnQzZlb3M1TklZb291eVRNcm44S0h5ZFhXTm1NMG4vSW5Wdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSFRIOU9aMzltUEpRWG9WTmNvalVzR2ZoQUJRbDZ5WUl3elg1Nm1FcGxVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsVXlOSzdpeEJldDA1aXdmZkxoeTJObEJ1dkJ0aU9yaTlSbUpvWWRyS1FjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNCczdRaVAyNUQrYnZ5R2plTGthdGUwcGtoQ2tBd3duWWVJT1F3a3Qvazg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRPVjd1ZndNNGlBNi9vMFF1dFpydi9Ia0xUWFo0VzR5WmM5czJ6SHZXbkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUoyelRNK0E3dGNLNEh0VmxWMUhya2dlU0NIaml5NVBPRTRyeVljSjkybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEFFdGYwTVExY29IUzJFOERvMXpleFN5MEtDWXlUYWRESExRRnpySTFuWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkwzZW5IeTRBUHFIdDJZeFk1SURJTFZNd0FwSU8vSE1LRU83YU1wWWNta2NHcFk0ellMTmYwMlBNbkFCbVRjak9pNlV6UTI5eEo0aFNwdWZ3bm03N0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJDenQ4Uk9SYU4wcjIrdXZBWDBaQjFIUkgvM1NWU1B6SlJsM2kxQWNwS2xNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYZ2drdHVRVlR4U3ZpVkFTdHdhNU1RIiwicGhvbmVJZCI6IjVjM2VlMWJjLWVkYTAtNGM4Yy04YmI2LTY1Mzc0NzFlNzViMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxUVBnRE9PNERLcDZ4SGxnc2RRblVDL2J3YkE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1lmYlZoRHQ5WWZha05BOEcyaDc2MzJxdjY0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpSSEVQUUZOIiwibWUiOnsiaWQiOiI1MDkzODU3ODM2MDoyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXZQZ25BUXI5eUV1Z1lZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiY01KdEVSMStsZHB0cmVtWitQU1p4R25KMWZOTnJlZXJPc09xb0IyN21nUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoickM0QUZWdXZzL29WTmxjbGxKdmIzTzA2ejB0QklhdTlYYXVzckxUTEpGSVBNNnF0aTVIOUVTMmVpQjdSNXFINVh6NlNTeXRza2NYWU5GY1EwLzBzRGc9PSIsImRldmljZVNpZ25hdHVyZSI6InpIZENtOWlZSGtncVY1cDgxbE9ZWXI4ZWxuQm1qNzBhZ0toWU1sUHZxdkZkeGFVRzZ0TmthaVVZeVZKdmlVMHkwbmY5RFBYWWhhVnZORlNlc0RCWUJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5Mzg1NzgzNjA6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWERDYlJFZGZwWGFiYTNwbWZqMG1jUnB5ZFh6VGEzbnF6ckRxcUFkdTVvRSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjMyNDkyNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPRkwifQ== || 'BELTAH-MD;;;',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "🐲𒁂🦠 ⚜️ KRXNS!🦇  {𝐒 𝐋 ☘}",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "50938578360",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "🐲𒁂🦠 ⚜️ KRXNS!🦇  {𝐒 𝐋 ☘}",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Haiti/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
