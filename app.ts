import express from 'express';
import { Signale } from 'signale';
import { armRouter } from './src/muscles/arm/infraestructure/armRoutes';

const app = express();
const signale = new Signale();

app.use(express.json());

// Rutas relacionadas con usuarios

app.use(armRouter)

app.listen(8082, () => {
    signale.success("Server for muscles service online in port 8082");
});

