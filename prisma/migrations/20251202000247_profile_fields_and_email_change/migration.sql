-- AlterTable
ALTER TABLE "users" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "email_changes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "new_email" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_changes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_changes_token_hash_key" ON "email_changes"("token_hash");

-- CreateIndex
CREATE INDEX "email_changes_user_id_idx" ON "email_changes"("user_id");
