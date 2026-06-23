import test from "node:test";
import assert from "node:assert/strict";
import { optionalUrl } from "./common";

test("optionalUrl accepts internal blob asset paths", () => {
  const result = optionalUrl.safeParse("/api/blob/files/profile/test.jpg");

  assert.equal(result.success, true);
});

test("optionalUrl still accepts absolute URLs", () => {
  const result = optionalUrl.safeParse("https://example.com/profile.jpg");

  assert.equal(result.success, true);
});
