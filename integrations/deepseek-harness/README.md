# REA plugin bundle for DeepSeek Harness

This directory packages [REA](https://github.com/morluto/rea) as an installable **DeepSeek Harness profile bundle**, compatible with the official profile-plugin manager introduced in Harness 0.2.1 (verified against the 0.2.1-rc.3 source interface). It is independent from `rea setup --client dsh`, which edits profile configuration directly.

## Install via the Desktop/Web plugin manager

1. Ensure Harness runs with a Node.js version accepted by REA (Node 22.23.4+, 24.22.1+, or 26.12.1+), npm/npx on PATH, and internet connectivity for the first REA CLI fetch.
2. In a checkout of this repository run:
   ```sh
   npm pack ./integrations/deepseek-harness --pack-destination .
   ```
   This produces `dsh-rea-bundle-0.3.0.tgz` in the repository root.
3. In Harness **Plugins → Install**, select the tarball's absolute path. The manager checks `dsh.bundle.patch` before installing the package.
4. After installation, choose **Enable now** for `dsh-rea-bundle` (installation and activation are separate). If no hot-reload is configured, fully restart the Harness Desktop/Web host. The MCP client exposes tools prefixed `mcp__rea__`.
5. If REA had already been registered using `rea setup --client dsh`, remove or disable the old `rea-mcp` entry *before* enabling this bundle to avoid duplicate IDs and MCP namespace collision. Keep a backup of the profile patch.

The bundle declares `@deepseek-ai/dsh-mcp-client@0.2.1-rc.3` as an explicit dependency (rather than assuming it is available from the host) and launches `npx --yes rea-agents@6.8.0 mcp` with stdio. Pinning is intentional: source-repository commits and floating npm `latest` are not equivalent to reproducible runtime versions. Startup fails visibly when npm cannot fetch REA, the required Node version is missing, or the MCP handshake fails. The Harness MCP client is configured to reconnect (up to 10 failed attempts) after an established connection drops.

**Offline use:** prewarm the verified REA version in the same npm cache/user environment that launches Harness by running `npx --yes rea-agents@6.8.0 --help`. The bundle does not guarantee completely offline startup; a production deployment needing offline-only startup should provide a controlled, local REA executable and override this MCP row accordingly.

## Direct registration alternative

REA also has a built-in setup path:
```sh
npx rea-agents@6.8.0 setup --client dsh --dry-run
npx rea-agents@6.8.0 setup --client dsh
npx rea-agents@6.8.0 doctor --client dsh --skill
```
Use **either** the direct setup or this profile bundle, not both. Direct setup also manages REA's separate agent skill; this profile bundle installs only the MCP connection, not a skill. All reverse-engineering analysis runs under the permissions of the Harness host and REA's providers; grant access only to targets you are authorized to analyze.

## Build validation

```sh
npm --prefix integrations/deepseek-harness test
npm --prefix integrations/deepseek-harness run pack:check
```

The tests validate the declared bundle contract, pinned REA command, namespace, and tarball file list. A **live** end-to-end verification must additionally start the latest Harness Desktop or Headless profile and confirm `mcp__rea__` tools appear. Passing pack/manifest tests is **not** evidence of a successful live MCP handshake.

This adapter is maintained by the fork at [xxxxxwater/rea](https://github.com/xxxxxwater/rea); the REA engine, cli package, and license remain attributed to their upstream project.
