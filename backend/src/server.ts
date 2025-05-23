import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', apiRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API W1 Patrimonial funcionando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});