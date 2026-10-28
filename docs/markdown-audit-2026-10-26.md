# Markdown documentation audit — DeepSeek Harness adapter (2026-10-26)

The `xxxxxwater/rea` repository contained **359 Markdown files** at the inspected baseline `b0c902509e7db57de0632972e4b626b95e3935cb`. The requested project-wide review focused on making **current user-facing documentation consistent** with the previously merged `dsh-rea-bundle@0.3.0` adapter, rather than rewriting unrelated historical reports or license texts to introduce false claims.

## Audit classification

| Baseline area                                                | Markdown files | Action                                                                                                                                                                                               |
| ------------------------------------------------------------ | -------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root and build/project governance                            |              7 | Updated active README, contribution and agent guidance; preserved generated or legal material.                                                                                                       |
| `docs/`                                                      |            247 | Updated current setup/configuration/verification/testing/release entry points and all 22 translated README files; other independent technical guides and dated historical verifications kept intact. |
| `.agents/`                                                   |             14 | Kept agent skills and frozen references unchanged because they are functional instructions, not DSH-specific integration docs.                                                                       |
| `.github/`                                                   |              1 | Updated PR checklist if its expected heading matched.                                                                                                                                                |
| `integrations/`                                              |              1 | Updated plugin README and added its dedicated changelog.                                                                                                                                             |
| `experiments/`                                               |             53 | Kept dated experiment evidence and analysis benchmarks unchanged.                                                                                                                                    |
| `licenses/`, `native/`, `tests/`, `third_party/`, `website/` |             36 | Updated the website project README only; kept test fixture descriptions, third-party provenance and license notices intact.                                                                          |
| **Total**                                                    |        **359** | Baseline inventory; new Markdown documents increase the total.                                                                                                                                       |

The purpose of preserving historical evidence is to avoid retroactively changing what was tested. The earlier live `verify:deepseek-client` notes reference a different Harness version and **direct setup method**, so they cannot prove the new bundle's native handshake. The current version matrix, real installation steps, archive tests, migration rules and remaining test gate are centralized in the [DeepSeek Harness integration guide](deepseek-harness.md).

## Coherence policy

- REA engine pin: `rea-agents@6.8.0`; adapter: `dsh-rea-bundle@0.3.0`; DSH MCP client: `@deepseek-ai/dsh-mcp-client@0.2.1-rc.3`.
- Enable the profile bundle explicitly after installation; `rea setup --client dsh` and bundle activation are **alternatives**, not cumulative steps.
- Node requirements and npm-cache/network prerequisites must not be confused with package-manager install success.
- Static packaging and source-interface validation must never be described as successful Desktop/Headless `tools/list` or a real REA operation.
- Keep original third-party license files, upstream generated release notes, archived verification evidence, test fixtures and unrelated technical references unchanged.
- Future releases should revise the [bundle changelog](https://github.com/xxxxxwater/rea/blob/main/integrations/deepseek-harness/CHANGELOG.md) and [integration guide](deepseek-harness.md) alongside the manifests, before repeating translations.

This is an editorial _audit of the entire Markdown inventory_, not a claim that every historical Markdown file was changed.
