/*
  Warnings:

  - A unique constraint covering the columns `[formId,userEmail]` on the table `form_submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "form_submissions_formId_userEmail_idx" ON "form_submissions"("formId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "form_submissions_formId_userEmail_key" ON "form_submissions"("formId", "userEmail");
