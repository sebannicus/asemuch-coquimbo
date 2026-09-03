import assert from "node:assert/strict";
import test from "node:test";
import { buildDocumentStoragePath, validateDocumentFile } from "../src/lib/document-files.ts";

test("validateDocumentFile accepts PDFs up to 10 MB", () => {
  assert.deepEqual(validateDocumentFile({ name: "acta.pdf", size: 1024, type: "application/pdf" }), { success: true });
});

test("validateDocumentFile rejects a non-PDF file", () => {
  assert.deepEqual(
    validateDocumentFile({ name: "acta.docx", size: 1024, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }),
    { success: false, message: "Solo se permiten archivos PDF." },
  );
});

test("buildDocumentStoragePath sanitizes the file name", () => {
  assert.equal(buildDocumentStoragePath("document-123", "Acta N° 1.PDF", "unique"), "documents/document-123/acta-n-1-unique.pdf");
});
