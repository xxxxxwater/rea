# REA for DeepSeek Harness — fork integration guide

> **Verified scope, 2026-10-26.** This guide describes the `xxxxxwater/rea` fork's installable DeepSeek Harness profile bundle. The official REA project is [morluto/rea](https://github.com/morluto/rea). The adapter was reviewed against the **Harness 0.2.1-rc.3 source interface**. A successful live Desktop/Headless MCP handshake has **not** been verified.

## Compatibility matrix

| Component | Pinned version | Meaning |
| --- | --- | --- |
| REA CLI | `rea-agents@6.8.0` | Subprocess started as an MCP server |
| DSH bundle | `dsh-rea-bundle@0.3.0` | Installable profile plugin from this fork |
| DSH MCP client | `@deepseek-ai/dsh-mcp-client@0.2.1-rc.3` | Explicit bundle dependency |
| Node.js | `^22.23.4 || ^24.22.1 || >=26.12.1` | REA's runtime requirement |

Check against later Harness releases before assuming the same APIs remain compatible. The bundle uses `dsh.bundle.patch` and an `rea-mcp` Cordis row with `serverName: rea`; the MCP tools should appear as `mcp__rea__*` **only after a successful connection**.

## Choose exactly one installation path

**Option A — install a native DSH bundle (fork):**

```sh
git clone https://github.com/xxxxxwater/rea.git
cd rea
npm --prefix integrations/deepseek-harness test
npm --prefix integrations/deepseek-harness run pack:check
npm pack ./integrations/deepseek-harness --pack-destination .
```

The generated package is `dsh-rea-bundle-0.3.0.tgz`. In DeepSeek Harness Desktop/Web choose **Plugins → Install**, select the absolute path to the local `.tgz`, and after installation select **Enable now**. Restart the Host if changes are not applied immediately. Verify the **active profile**'s `package.json` dependency and `dsh.profile.bundles` selection; package installation alone does not prove activation. Inspect the actual agent tool listing and call a harmless REA read-only operation on an authorized fixture to verify the MCP session.

**Option B — directly configure REA (upstream setup):**

```sh
npx --yes rea-agents@6.8.0 setup --client dsh --dry-run
npx --yes rea-agents@6.8.0 setup --client dsh
npx --yes rea-agents@6.8.0 doctor --client dsh --skill
```

Option B edits Cordis YAML patches and may install the REA agent skill. Option A installs **only the MCP bridge**, not the skill. **Never enable both paths together:** each claims the same `rea-mcp` row and `serverName: rea` namespace, potentially causing conflicts.

## Migrating from an older REA plugin

1. Back up the selected DSH profile, its `package.json`, and its Cordis patches (including any Home `$DSH_HOME/cordis.patch.yml` REA registration).
2. Disable an existing `rea-mcp` row from `rea setup --client dsh` before enabling the bundle. Remove or disable any old `dsh-rea-bundle@0.2.0` package in the active profile; keep unrelated Cordis rows.
3. Install the new local tarball, **enable** its profile bundle explicitly, restart if needed, and inspect the tool list.
4. Re-test the authorization and tooling of any providers you enable. Native analysis engines remain bring-your-own; the bundle does not install Ghidra, IDA, Hopper, or JADX.

The bundle launches `npx --yes rea-agents@6.8.0 mcp`, so the first launch may require network/npm cache and a valid Node/npx on the Host PATH. A local `.tgz` avoids Git install preparation errors, but **does not contain an offline REA binary**.

## Troubleshooting

| Symptom | Diagnosis |
| --- | --- |
| Installed, but not visible in tool list | Check `dsh.profile.bundles` for the **active** profile; select **Enable now**, restart if HMR is unavailable and review MCP logs. |
| Duplicate `rea-mcp` or `serverName: rea` | Disable the older direct setup or bundle registration; avoid removing unrelated entries. |
| `ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED` | Install the prepacked local `.tgz`, not a Git dependency that requires a prepare script. |
| REA process cannot start | Verify Node meets the requirement, `npx` is on PATH, and the pinned npm REA version can be fetched or cached. |
| MCP startup fails or tools disconnect | `failOnStartupError: true` reports initial failures. The declared reconnect policy is bounded (up to 10 failed attempts). Investigate Host logs rather than assuming the plugin is working. |

## Verification, evidence and releases

```sh
npm --prefix integrations/deepseek-harness test
npm --prefix integrations/deepseek-harness run pack:check
```

The [bundle workflow](../.github/workflows/dsh-rea-bundle.yml) checks the manifest, REA version, YAML registration and tarball file list. CI packaging success is **not** live Harness interoperability. Native qualification still requires a recorded Host/OS/Node/REA version, archive hash, plugin activation state, MCP `tools/list`, one REA tool call, and teardown/failure-recovery results. At the time of this revision those native receipts are **not available**.

Adapter changes and releases are recorded in the [bundle-specific changelog](../integrations/deepseek-harness/CHANGELOG.md). The official core's generated [CHANGELOG](../CHANGELOG.md) and REA upstream publication process are separate. For details see [client configuration](client-configuration.md), [client verification](client-verification.md), and [installation](installation.md).
