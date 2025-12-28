/*
  Warnings:

  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- DropTable
DROP TABLE "Form";

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_link" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "form_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "forms_userId_idx" ON "forms"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "forms_id_userId_key" ON "forms"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "form_link_tokenHash_key" ON "form_link"("tokenHash");

-- CreateIndex
CREATE INDEX "form_link_tokenHash_idx" ON "form_link"("tokenHash");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_link" ADD CONSTRAINT "form_link_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
