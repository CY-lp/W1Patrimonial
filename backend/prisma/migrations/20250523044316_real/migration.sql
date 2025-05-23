-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENTE', 'CONSULTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMOVEL', 'VEICULO', 'INVESTIMENTO', 'CONTA_CORRENTE', 'CONTA_POUPANCA', 'APLICACAO_FINANCEIRA', 'OUTROS');

-- CreateEnum
CREATE TYPE "LiabilityType" AS ENUM ('EMPRESTIMO', 'FINANCIAMENTO', 'DIVIDA', 'OUTROS');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RECEITA', 'DESPESA', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CONTRATO', 'CERTIDAO', 'ESCRITURA', 'COMPROVANTE', 'OUTROS');

-- CreateEnum
CREATE TYPE "InviteType" AS ENUM ('CONSULTOR', 'MEMBRO');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDENTE', 'ACEITO', 'EXPIRADO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "googleId" TEXT,
    "tipo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "consultor_id" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "family_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "AssetType" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "family_id" TEXT NOT NULL,
    "data_aquisicao" TIMESTAMP(3),

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liability" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "LiabilityType" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "family_id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3),

    CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "tipo" "TransactionType" NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "url_arquivo" TEXT NOT NULL,
    "tipo" "DocumentType" NOT NULL,
    "family_id" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "email_convidado" TEXT NOT NULL,
    "tipo" "InviteType" NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "family_id" TEXT NOT NULL,
    "criado_por" TEXT NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_googleId_key" ON "usuarios"("googleId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_consultor_id_fkey" FOREIGN KEY ("consultor_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
