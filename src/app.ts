import express from 'express';
import { getHeroRoutes } from "./routes/hero.route";

const app = express();

const PORT = '5000';

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use('/hero', getHeroRoutes());

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})