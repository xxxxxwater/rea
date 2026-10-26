# DeepSeek Harness adapter changelog (fork-specific)

This is the change history for the installable `dsh-rea-bundle` profile integration in [xxxxxwater/rea](https://github.com/xxxxxwater/rea). It is **not** a `rea-agents` release; the official engine history is in the [root changelog](../../CHANGELOG.md).

## 0.3.0 — 2026-10-25

- Added the `dsh.bundle.patch` profile integration, reviewed against Harness `0.2.1-rc.3`.
- Pinned `rea-agents@6.8.0` as a stdio MCP server and declared `@deepseek-ai/dsh-mcp-client@0.2.1-rc.3`.
- Added startup failure reporting, bounded reconnect configuration, archive verification and a GitHub Actions workflow.
- Documented the `rea setup --client dsh` collision and the separate **Enable now** step.
- Merged in [fork PR #5](https://github.com/xxxxxwater/rea/pull/5), commit `b0c902509e7db57de0632972e4b626b95e3935cb`.

**Not yet verified:** real Harness Desktop/Headless MCP handshake, analysis call and shutdown.

## Documentation update — 2026-10-26

- Aligned the current user-facing integration guides and multilingual README links.
- Added [the complete adapter guide](../../docs/deepseek-harness.md) and a separate acceptance-evidence policy.
- Kept upstream releases, historical verification records and third-party notices unchanged.
