// Returns the items pushed out of the buffer
export async function ringBufferAppend<T>(record: Aha.HasExtensionFields, identifier: string, key: string, size: number, data: T): Promise<T[]> {
  let arr = (await record.getExtensionField<T[]>(identifier, key)) || []

  // [ removed ... kept ... added ]
  let removed = []
  const split = arr.length - (size - 1)
  if (arr.length >= size) {
    removed = arr.slice(0, split)
    arr = arr.slice(split)
  }
  arr.push(data)
  record.setExtensionField(identifier, key, arr)

  return removed
}

export async function append<T>(record: Aha.HasExtensionFields, identifier: string, key: string, data: T) {
  let arr = (await record.getExtensionField<T[]>(identifier, key)) || []
  arr.push(data)
  record.setExtensionField(identifier, key, data)
}

export function runKey(run: TestRun): string {
  return ['testResults', run.timestamp, run.branch, run.environment].join('.')
}