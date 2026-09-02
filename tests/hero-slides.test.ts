import assert from "node:assert/strict";
import test from "node:test";

import { getNextSlideIndex, heroSlides } from "../src/lib/hero-slides.ts";

test("hero slides include supplied images and wrap after the last slide", () => {
  assert.ok(heroSlides.length >= 3);
  assert.equal(getNextSlideIndex(heroSlides.length - 1, heroSlides.length), 0);
});

test("hero slide rotation leaves the first slide selected for an empty collection", () => {
  assert.equal(getNextSlideIndex(0, 0), 0);
});
