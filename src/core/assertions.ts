import { equal } from "std/testing/asserts.ts";
import Assertion from "../assertion.ts";
import util from "../utils/mod.ts";

["to", "be"].forEach((chain) => {
  Assertion.addProperty(chain);
});

Assertion.addProperty("not", function () {
  util.flag(this, "negate", true);
});

Assertion.addProperty("true", function () {
  this.assert(
    equal(true, util.flag(this, "object")),
    `expected #{this} to be true`,
    `expected #{this} to be false`,
    util.flag(this, "negate") ? false : true,
  );
});
