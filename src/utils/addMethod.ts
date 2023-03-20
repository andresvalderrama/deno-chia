import Assertion from "../assertion.ts";
import util from "./mod.ts";
import transferFlags from "./transferFlags.ts";

export default function addMethod(ctx, name, method) {
  const methodWrapper = function () {
    const result = method.apply(this, arguments);
    if (result !== undefined) return result;

    const newAssertion = new Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  util.addLengthGuard(methodWrapper, name, false);
  ctx[name] = util.proxify(methodWrapper, name);
}

// https://github.com/mjackson/expect
