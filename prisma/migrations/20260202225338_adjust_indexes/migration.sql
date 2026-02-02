-- DropIndex
DROP INDEX "form_link_tokenHash_idx";

-- DropIndex
DROP INDEX "form_progress_formId_userEmail_idx";

-- DropIndex
DROP INDEX "form_submissions_formId_userEmail_idx";

-- DropIndex
DROP INDEX "forms_id_userId_key";

-- CreateIndex
CREATE INDEX "EmailVerification_userId_idx" ON "EmailVerification"("userId");

-- CreateIndex
CREATE INDEX "EmailVerification_tokenHash_idx" ON "EmailVerification"("tokenHash");

-- CreateIndex
CREATE INDEX "EmailVerification_expiresAt_idx" ON "EmailVerification"("expiresAt");

-- CreateIndex
CREATE INDEX "PasswordReset_userId_idx" ON "PasswordReset"("userId");

-- CreateIndex
CREATE INDEX "PasswordReset_tokenHash_idx" ON "PasswordReset"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordReset_expiresAt_idx" ON "PasswordReset"("expiresAt");

-- CreateIndex
CREATE INDEX "email_changes_expires_at_idx" ON "email_changes"("expires_at");

-- CreateIndex
CREATE INDEX "form_submissions_formId_submitted_at_userEmail_idx" ON "form_submissions"("formId", "submitted_at", "userEmail");

-- CreateIndex
CREATE INDEX "forms_userId_updatedAt_idx" ON "forms"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "forms_userId_title_idx" ON "forms"("userId", "title");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_expires_idx" ON "sessions"("expires");
