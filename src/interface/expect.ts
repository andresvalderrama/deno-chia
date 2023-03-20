import { AssertionError } from "std/testing/asserts.ts";
import Assertion from "../assertion.ts";

export default function expect(target, message?) {
  return new Assertion(target, message);
}

expect.fail = function (actual, expected?, message?, operator?) {
  if (arguments.length < 2) {
    message = actual;
    actual = undefined;
  }

  message = message || "expect.fail()";

  throw new AssertionError(message);
};
