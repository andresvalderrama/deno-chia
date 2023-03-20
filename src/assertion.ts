import { format } from "std/testing/_format.ts";
import { AssertionError } from "std/testing/asserts.ts";
import { buildMessage, diff, diffstr } from "std/testing/_diff.ts";
import { red } from "std/fmt/colors.ts";
import config from "./config.ts";
import util from "./utils/mod.ts";

const CAN_NOT_DISPLAY = "[Cannot Display]";

export default function Assertion(obj?, message?) {
  util.flag(this, "object", obj);
  util.flag(this, "message", message);

  return util.proxify(this);
}

Assertion.addProperty = function (name, fn?) {
  util.addProperty(this.prototype, name, fn);
};

Assertion.prototype.assert = function (
  expr,
  msg,
  negateMessage,
  expected,
  _actual,
  showDiff = false,
) {
  const ok = util.test(this, arguments);

  if (showDiff !== false) showDiff = true;
  if (expected === undefined && _actual === undefined) showDiff = false;
  if (config.showDiff !== true) showDiff = false;

  if (!ok) {
    let message = util.getMessage(this, arguments);
    const actual = util.getActual(this, arguments);
    const actualString = format(actual);
    const expectedString = format(expected);
    try {
      const stringDiff = (typeof actual === "string") &&
        (typeof expected === "string");
      const diffResult = stringDiff
        ? diffstr(actual as string, expected as string)
        : diff(actualString.split("\n"), expectedString.split("\n"));
      const diffMsg = buildMessage(diffResult, { stringDiff }).join("\n");
      message += `:\n${diffMsg}`;
    } catch {
      message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
    }
    throw new AssertionError(message);
  }

  // let message = "";
  // const actualString = format(actual);
  // const expectedString = format(expected);
  // try {
  //   const stringDiff = (typeof actual === "string") &&
  //     (typeof expected === "string");
  //   const diffResult = stringDiff
  //     ? diffstr(actual as string, expected as string)
  //     : diff(actualString.split("\n"), expectedString.split("\n"));
  //   const diffMsg = buildMessage(diffResult, { stringDiff }).join("\n");
  //   message = `Values are not equal:\n${diffMsg}`;
  // } catch {
  //   message = `\n${red(CAN_NOT_DISPLAY)} + \n\n`;
  // }

  // if (msg) {
  //   message = msg;
  // }

  // throw new AssertionError(message);
};

Object.defineProperty(Assertion.prototype, "_obj", {
  get() {
    return util.flag(this, "object");
  },
  set(val) {
    util.flag(this, "object", val);
  },
});
