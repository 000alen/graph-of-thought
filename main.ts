import "dotenv/config";

import { openai } from "@ai-sdk/openai";
import { graphOfThought } from "./src";
import { log } from "./src/logging";

async function main() {
  const { result } = await graphOfThought({
    model: openai("gpt-4o-mini"),
    context: "You are a helpful assistant. You plan before you act.",
    task: "Write a short article about topological sorting and its applications.",
    aggregate: true
  })
    .catch(
      (error) => {
        log("error", error);
        throw error;
      }
    );

  if (!result) {
    log("no result");
    throw new Error("no result");
  }

  console.log(result);
}

main()
  .catch((error) => {
    log("fatal error", error);

    process.exit(1);
  });
