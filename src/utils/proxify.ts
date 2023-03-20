import config from "../config.ts";
import util from "./mod.ts";

const builtins = ["__flags", "__methods", "_obj", "assert"];

function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }

  const memo = [];
  // `memo` is a two-dimensional array containing distances.
  // memo[i][j] is the distance between strA.slice(0, i) and
  // strB.slice(0, j).
  for (let i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (let j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }

  for (let i = 1; i <= strA.length; i++) {
    const ch = strA.charCodeAt(i - 1);
    for (let j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] +
          (ch === strB.charCodeAt(j - 1) ? 0 : 1),
      );
    }
  }

  return memo[strA.length][strB.length];
}

export default function proxify(obj, nonChainableMethodName = false) {
  if (!util.isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      if (
        typeof property === "string" &&
        !config.proxyExcludedKeys.includes(property) &&
        !Reflect.has(target, property)
      ) {
        if (nonChainableMethodName) debugger;

        let suggestion = null;
        let suggestionDistance = 4;
        util.getProperties(target).forEach((prop) => {
          if (
            !Object.prototype.hasOwnProperty(prop) &&
            !builtins.includes(prop)
          ) {
            const dist = stringDistanceCapped(
              property,
              prop,
              suggestionDistance,
            );

            if (dist < suggestionDistance) {
              suggestion = prop;
              suggestionDistance = dist;
            }
          }
        });

        if (suggestion !== null) debugger;
      }

      return Reflect.get(target, property);
    },
  });
}
