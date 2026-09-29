# Upstream review

Exact source: [grunt-contrib-uglify@5.2.2](https://www.npmjs.com/package/grunt-contrib-uglify/v/5.2.2), [4a73c8aad6d937438d0ef7150576ed5281a68564](https://github.com/gruntjs/grunt-contrib-uglify/commit/4a73c8aad6d937438d0ef7150576ed5281a68564). Runtime task files match the integrity-checked upstream npm tarball byte-for-byte. Original authors and license are retained.

## Issue review (2026-09-29)

- [#586: Paths containing dots](https://github.com/gruntjs/grunt-contrib-uglify/issues/586): Execute original minification/file-map tests, preserving path semantics.
- [#571: Await parser behavior](https://github.com/gruntjs/grunt-contrib-uglify/issues/571): Retain the supported UglifyJS3 parser and run the upstream parsing/output assertions.
- [#585: Parser options](https://github.com/gruntjs/grunt-contrib-uglify/issues/585): Preserve original option forwarding and all supplied regression fixtures.

No issue response or upstream contact was made. These are scoped compatibility decisions, not claims that every reported issue is fixed.

## Development maintenance

The original Grunt task fixtures and Nodeunit assertion bodies run unchanged. A small Node assert adapter preserves expected assertion counts and asynchronous done timeouts; it replaces obsolete Nodeunit/TAP dependencies. Obsolete JSHint and release-only grunt-contrib-internal tooling were removed. The current Grunt runner is development-only; package engines and runtime dependencies retain the upstream declarations. The same full fixture suite runs against an installed package archive.

Run `npm ci --ignore-scripts`, `npm test`, `npm run test:package`, and `npm audit --audit-level=low`. GitHub CI and CodeQL gate exact artifact publication with provenance and immutable release evidence.

The original output snapshots were refreshed for UglifyJS3.19.3, already permitted by the unchanged ^3.16.1 runtime range. Reviewed differences are source-map end positions, generated property names and declaration ordering. Independent VM execution, decoded source-map locations and dotted-directory checks supplement the full upstream fixture suite. See test/fixture-toolchain.json.
