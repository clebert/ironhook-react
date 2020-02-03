# ts-library-template

[![][ci-badge]][ci-link] [![][version-badge]][version-link]
[![][license-badge]][license-link] [![][types-badge]][types-link]
[![][size-badge]][size-link]

[ci-badge]:
  https://github.com/clebert/ts-library-template/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/ts-library-template
[version-badge]: https://badgen.net/npm/v/ts-library-template
[version-link]: https://www.npmjs.com/package/ts-library-template
[license-badge]: https://badgen.net/npm/license/ts-library-template
[license-link]:
  https://github.com/clebert/ts-library-template/blob/master/LICENSE
[types-badge]: https://badgen.net/npm/types/ts-library-template
[types-link]: https://github.com/clebert/ts-library-template
[size-badge]: https://badgen.net/bundlephobia/minzip/ts-library-template
[size-link]: https://bundlephobia.com/result?p=ts-library-template

A TypeScript library template.

## Installation

Using `yarn`:

```
yarn add ts-library-template
```

Using `npm`:

```
npm install ts-library-template --save
```

## Development

### Publish A New Release

```
yarn release patch
```

```
yarn release minor
```

```
yarn release major
```

After a new release has been created by pushing the tag, it must be published
via the GitHub UI. This triggers the final publication to npm.

---

Copyright (c) 2020, Clemens Akens. Released under the terms of the
[MIT License](https://github.com/clebert/ts-library-template/blob/master/LICENSE).
