const baseFlags = ["object", "message"];

export default function transferFlags(
  assertion,
  newAssertion,
  includeAll = true,
) {
  const flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!newAssertion.__flags) newAssertion.__flags = Object.create(null);

  for (const flag in flags) {
    if (includeAll || !baseFlags.includes(flag)) {
      newAssertion.__flags[flag] = flags[flag];
    }
  }
}
