import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (_req, res) => res.send("Hello World"));

app.listen(PORT, () => {
    `running on ${PORT}`;
})
