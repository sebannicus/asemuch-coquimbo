import assert from "node:assert/strict";
import test from "node:test";
import { validateAgreementImage } from "../src/lib/agreement-assets.ts";

test("validateAgreementImage accepts WebP images", () => {
  assert.deepEqual(validateAgreementImage({ name: "beneficio.webp", size: 1024, type: "image/webp" }), { success: true });
});

test("validateAgreementImage rejects unsupported image formats", () => {
  assert.deepEqual(
    validateAgreementImage({ name: "beneficio.gif", size: 1024, type: "image/gif" }),
    { success: false, message: "Solo se permiten imagenes JPG, PNG o WebP." },
  );
});
