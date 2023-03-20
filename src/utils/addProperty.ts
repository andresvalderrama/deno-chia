import Assertion from "../assertion.ts";
import flag from "./flag.ts";
import isProxyEnabled from "./isProxyEnabled.ts";
import transferFlags from "./transferFlags.ts";

function noGetter() {}

export default function addProperty(ctx, name, getter = noGetter) {
  Object.defineProperty(ctx, name, {
    get: function propertyGetter() {
      if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
        flag(this, "ssfi", propertyGetter);
      }

      const result = getter.call(this);
      if (result !== undefined) return result;
      const newAssertion = new Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    },
    configurable: true,
  });
}
