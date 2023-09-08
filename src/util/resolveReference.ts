export const resolveReference = async (
  descriptor: ReferenceDescriptor
): Promise<Aha.RecordUnion | null> => {
  console.log(`Extracted ${descriptor.id} from payload`);

  const RecordClass = aha.models[descriptor.typename];
  if (!RecordClass) {
    console.log(`Invalid Record Type ${descriptor.typename}`);
    return null;
  }

  try {
    // @ts-ignore
    const record: Aha.RecordUnion = await RecordClass.select(
      "id",
      "referenceNum"
    ).find(descriptor.id);

    return record;
  } catch (error) {
    //This is the case that branch has correct naming convention but aha! doesn't have that record
    console.log(`Unable to find record for ${descriptor.id}`);
    console.error(error);

    return null;
  }
};