import util from "./mod.ts";

export default function test(obj, args) {
  const negate = util.flag(obj, "negate");
  const expr = args[0];

  return negate ? !expr : expr;
}
