import Assertion, { AssertionStatic } from "../assertion.ts";

export default function flag(obj, key, value?) {
  const flags = obj.__flags ?? (obj.__flags = Object.create(null));
  if (arguments.length === 3) flags[key] = value;
  return flags[key];
}
