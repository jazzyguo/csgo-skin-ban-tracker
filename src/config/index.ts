import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env` });

export const config = {
    PORT: process.env.PORT,
    PG_HOST: process.env.PG_HOST ?? 'database',
    PG_USER: process.env.PG_USER ?? 'awesome_user',
    PG_PASS: process.env.PG_PASSWORD ?? 'awesome_password',
    PG_NAME: process.env.PG_NAME ?? 'csgo_ban',
};

export const AUTH_TOKEN = process.env.AUTH_TOKEN;
