import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { authRouter } from './src/routes/auth';
import { assetsRouter } from './src/routes/assets';
import { liabilitiesRouter } from './src/routes/liabilities';
import { transactionsRouter } from './src/routes/transactions';
import { documentsRouter } from './src/routes/documents';
import { authMiddleware } from './src/middlewares/auth';

config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas públicas
app.use('/auth', authRouter);

// Rotas protegidas
app.use('/assets', authMiddleware, assetsRouter);
app.use('/liabilities', authMiddleware, liabilitiesRouter);
app.use('/transactions', authMiddleware, transactionsRouter);
app.use('/documents', authMiddleware, documentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});