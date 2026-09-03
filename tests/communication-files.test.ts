import assert from "node:assert/strict";
import test from "node:test";
import { buildCommunicationFileStoragePath, validateCommunicationFile } from "../src/lib/communication-files.ts";

test("validateCommunicationFile accepts a PDF within the size limit", () => {
  assert.deepEqual(
    validateCommunicationFile({ name: "comunicado.pdf", size: 2 * 1024 * 1024, type: "application/pdf" }),
    { success: true },
  );
});

test("validateCommunicationFile rejects unsupported attachments", () => {
  assert.deepEqual(
    validateCommunicationFile({ name: "comunicado.exe", size: 512, type: "application/octet-stream" }),
    { success: false, message: "Solo se permiten archivos PDF, Word o Excel." },
  );
});

test("validateCommunicationFile rejects attachments larger than 10 MB", () => {
  assert.deepEqual(
    validateCommunicationFile({ name: "comunicado.pdf", size: 10 * 1024 * 1024 + 1, type: "application/pdf" }),
    { success: false, message: "El archivo adjunto debe pesar como maximo 10 MB." },
  );
});

test("buildCommunicationFileStoragePath creates a sanitized unique path", () => {
  assert.equal(
    buildCommunicationFileStoragePath("communication-123", "Comunicado N° 1.PDF", "unique"),
    "communications/communication-123/comunicado-n-1-unique.pdf",
  );
});
