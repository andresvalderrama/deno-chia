const fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, "length");

export default function addLengthGuard(fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, "length", {
    get: function () {
      if (isChainable) {
        throw Error(
          `Invalid Chai property: ${assertionName}.length. Due to a compatibility issue, "length" cannot directly follow "${assertionName}". Use "${assertionName}.lengthOf" instead.`,
        );
      }

      throw Error(
        `Invalid Chai property: ${assertionName}.length. See docs for proper usage of "${assertionName}".`,
      );
    },
  });

  return fn;
}
