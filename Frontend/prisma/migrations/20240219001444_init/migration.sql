-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "llmName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "isModerator" BOOLEAN NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "LLM" (
    "llmName" TEXT NOT NULL,

    CONSTRAINT "LLM_pkey" PRIMARY KEY ("llmName")
);

-- CreateTable
CREATE TABLE "BookMarked" (
    "accountID" TEXT NOT NULL,
    "promptID" TEXT NOT NULL,

    CONSTRAINT "BookMarked_pkey" PRIMARY KEY ("accountID")
);

-- CreateTable
CREATE TABLE "HasTag" (
    "tagName" TEXT NOT NULL,
    "promptID" TEXT NOT NULL,

    CONSTRAINT "HasTag_pkey" PRIMARY KEY ("tagName")
);

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_llmName_fkey" FOREIGN KEY ("llmName") REFERENCES "LLM"("llmName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarked" ADD CONSTRAINT "BookMarked_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarked" ADD CONSTRAINT "BookMarked_promptID_fkey" FOREIGN KEY ("promptID") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasTag" ADD CONSTRAINT "HasTag_promptID_fkey" FOREIGN KEY ("promptID") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasTag" ADD CONSTRAINT "HasTag_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
