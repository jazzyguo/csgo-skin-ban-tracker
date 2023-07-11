import cors from 'cors';
import { json } from 'body-parser';
import express, { Application } from 'express';
import errorHandler from 'strong-error-handler';
import { seedRouter, inventoryRouter, countsRouter } from './routes'

export const app: Application = express();

app.use(cors());
app.use(json());

app.use(seedRouter);
app.use(inventoryRouter);
app.use(countsRouter)

app.use(
    errorHandler({
        debug: process.env.NODE_ENV === 'development',
        log: true,
    })
);
