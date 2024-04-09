import { accounts } from "../accountSeed";
import { hasTags } from "../hasTagSeed";
import { llms } from "../llmSeed";
import { tags } from "../tagSeed";
import { prompts } from "../promptSeed";
import { prisma } from "../lib/prisma";

async function main() {
  for (let account of accounts) {
    await prisma.account.create({
      data: account,
    });
  }
  for (let llm of llms) {
    await prisma.lLM.create({
      data: llm,
    });
  }
  for (let tag of tags) {
    await prisma.tag.create({
      data: tag,
    });
  }
  for (let prompt of prompts) {
    await prisma.prompt.create({
      data: prompt,
    });
  }
  for (let hasTag of hasTags) {
    await prisma.hasTag.create({
      data: hasTag,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
