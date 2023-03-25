import express from 'express';
import { heroeRoute } from './heroe/routes';
import { villanRoute } from './villan/routes';

const port = 3000;
const app = express();

app.use(express.json());

app.use('/heroe', heroeRoute);
app.use('/villan', villanRoute);

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});
