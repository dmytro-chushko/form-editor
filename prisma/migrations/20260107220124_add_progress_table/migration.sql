-- CreateTable
CREATE TABLE "form_progress" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "form_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "form_progress_userEmail_idx" ON "form_progress"("userEmail");

-- CreateIndex
CREATE INDEX "form_progress_formId_userEmail_idx" ON "form_progress"("formId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "form_progress_formId_userEmail_key" ON "form_progress"("formId", "userEmail");

-- AddForeignKey
ALTER TABLE "form_progress" ADD CONSTRAINT "form_progress_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
