import { assertEquals } from "std/testing/asserts.ts"

Deno.test("assert", () => {
    assertEquals("bar", "bar")
})