import "./core/assertions.ts";
import util from "./utils/mod.ts";
import expect from "./interface/expect.ts";
import Assertion from "./assertion.ts";

export * from "./interface/expect.ts";

const used = [];

const chai = {
  version: "0.0.1",
  expect,
  use(fn) {
    const exports = {
      Assertion,
    };

    if (!used.includes(fn)) {
      fn(exports, util);
    }
    return chai;
  },
};
export default chai;
