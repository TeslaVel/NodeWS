// app.ts
import './dotenv';
import express from 'express';
import indexRouter from './server/routes/index';
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors({
  origins: ['http://localhost:3002/*'],
}));

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// module.exports = app;