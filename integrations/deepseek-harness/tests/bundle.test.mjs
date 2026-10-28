import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import test from "node:test";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const manifest = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);
const upstream = JSON.parse(
  readFileSync(resolve(root, "../..", "package.json"), "utf8"),
);
const patch = readFileSync(resolve(root, "cordis.patch.yml"), "utf8");
const lines = patch.split(/\r?\n/).filter((line) => !/^\s*(#|$)/.test(line));

test("Harness bundle manifest selects a shipped patch and a unique package", () => {
  assert.equal(manifest.name, "dsh-rea-bundle");
  assert.equal(manifest.dsh?.bundle?.patch, "./cordis.patch.yml");
  assert.equal(manifest.private, false);
  assert.ok(manifest.files.includes("cordis.patch.yml"));
  assert.match(manifest.engines.node, /22\.23\.4/);
});

test("MCP row uses the latest verified harness client interface", () => {
  assert.deepEqual(lines.slice(0, 2), ["- insert:", "    - id: rea-mcp"]);
  assert.ok(
    lines.some((line) =>
      /^ {6}name: (["'])@deepseek-ai\/dsh-mcp-client\1$/.test(line),
    ),
  );
  assert.ok(lines.includes("        serverName: rea"));
  assert.ok(lines.includes("        transport: stdio"));
  assert.ok(lines.includes("        command: npx"));
  assert.ok(lines.includes("        failOnStartupError: true"));
  assert.equal(
    lines.filter((line) => /^\s*- id: rea-mcp$/.test(line)).length,
    1,
  );
});

test("REA version stays pinned to the source root package version", () => {
  const command = lines
    .filter((line) => /^\s*- (?:--yes|rea-agents@.*|mcp)$/.test(line))
    .map((line) => line.trim().slice(2));
  assert.deepEqual(command, ["--yes", `rea-agents@${upstream.version}`, "mcp"]);
  assert.equal(upstream.name, "rea-agents");
  assert.ok(!patch.includes("rea-agents@latest"));
});

test("REA reconnection policy is bounded and installation does not run lifecycle scripts", () => {
  assert.ok(lines.includes("          enabled: true"));
  assert.ok(lines.includes("          maxAttempts: 10"));
  assert.equal(
    Object.keys(manifest.scripts).some((s) =>
      /^(pre|post)?install$|^prepare$/.test(s),
    ),
    false,
  );
  assert.equal(
    manifest.dependencies["@deepseek-ai/dsh-mcp-client"],
    "0.2.1-rc.3",
  );
});
