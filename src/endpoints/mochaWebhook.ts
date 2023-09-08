import { IDENTIFIER } from "../util/constants";
import { append, ringBufferAppend, runKey } from "../util/extensionFields";
import { extractReferences } from "../util/extractReferences";
import { resolveReference } from "../util/resolveReference";

aha.on("mochaWebhook", async ({ headers, payload }: WebhookRequest) => {
  const { stats, tests } = payload
  const branch = headers["X-Mocha-Branch"]
  const environment = headers["X-Mocha-Environment"]
  const newRun = {
    timestamp: stats.start,
    branch,
    environment
  }
  const removedRuns = await ringBufferAppend<TestRun>(aha.account, IDENTIFIER, "testRuns", 5, newRun)

  for (const test of tests) {
    const refs = extractReferences(test.fullTitle)
    for (const ref of refs) {
      const record = await resolveReference(ref)
      if (!record) continue

      append<MochaTestResult>(record, IDENTIFIER, runKey(newRun), test)

      // Clean up old run data on the record
      for (const removedRun of removedRuns) {
        record.clearExtensionField(IDENTIFIER, runKey(removedRun))
      }
    }
  }
});