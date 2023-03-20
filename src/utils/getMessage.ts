import util from "./mod.ts";

export default function getMessage(obj, args) {
  const negate = util.flag(obj, "negate");
  const val = util.flag(obj, "object");
  const expected = args[3];
  const actual = util.getActual(obj, args);
  const flagMsg = util.flag(obj, "message");
  let msg = negate ? args[2] : args[1];

  if (typeof msg === "function") msg = msg();
  msg = msg || "";
  msg = msg.replace("#{this}", val)
    .replace("#{act}", actual)
    .replace("#{exp}", expected);

  return flagMsg ? flagMsg + ": " + msg : msg;
}
