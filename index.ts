import chai from "./src/mod.ts";

const a = chai.expect.fail(2, 4, "message");

console.log(a);
