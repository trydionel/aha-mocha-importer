const BASE_PATTERN = /([a-z0-9]{1,10}-(?:[E0-9]-)?[0-9]+)/ig
const REQ_PATTERN = /[a-z0-9]{1,10}-[0-9]+-[0-9]+/i
const EPIC_PATTERN = /[a-z0-9]{1,10}-E-[0-9]+/i
const FEATURE_PATTERN = /[a-z0-9]{1,10}-[0-9]+/i

export const extractReferences = (input: string): ReferenceDescriptor[] => {
  const matches = input.match(BASE_PATTERN)
  if (!matches) return []

  return matches.map(id => {
    if (id.match(REQ_PATTERN)) {
      return {
        typename: 'Requirement',
        id
      };
    }

    if (id.match(EPIC_PATTERN)) {
      return {
        typename: 'Epic',
        id
      };
    }

    if (id.match(FEATURE_PATTERN)) {
      return {
        typename: 'Feature',
        id
      };
    }
  })
};