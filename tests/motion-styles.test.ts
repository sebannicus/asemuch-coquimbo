import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const styles = readFileSync(resolve("src/app/globals.css"), "utf8");

test("motion utilities animate content while respecting reduced-motion preferences", () => {
  assert.match(styles, /\.motion-enter/);
  assert.match(styles, /\.motion-enter-delay-1/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});
