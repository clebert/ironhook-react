# ironhook-react

[![][ci-badge]][ci-link] [![][version-badge]][version-link]
[![][license-badge]][license-link] [![][types-badge]][types-link]
[![][size-badge]][size-link]

[ci-badge]: https://github.com/clebert/ironhook-react/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/ironhook-react
[version-badge]: https://badgen.net/npm/v/ironhook-react
[version-link]: https://www.npmjs.com/package/ironhook-react
[license-badge]: https://badgen.net/npm/license/ironhook-react
[license-link]: https://github.com/clebert/ironhook-react/blob/master/LICENSE
[types-badge]: https://badgen.net/npm/types/ironhook-react
[types-link]: https://github.com/clebert/ironhook-react
[size-badge]: https://badgen.net/bundlephobia/minzip/ironhook-react
[size-link]: https://bundlephobia.com/result?p=ironhook-react

Allows easy use of Hooks written with Ironhook in React.

## Installation

Using `yarn`:

```
yarn add ironhook-react
```

Using `npm`:

```
npm install ironhook-react --save
```

## Usage Example

The following is a constructed example that demonstrates the use of this
library:

```js
import * as Ironhook from 'ironhook';
import * as IronhookReact from 'ironhook-react';
import * as React from 'react';

function useName() {
  const [name, setName] = Ironhook.useState('World');

  Ironhook.useEffect(() => {
    setTimeout(() => setName('John Doe'), 10);
  }, []);

  return name;
}

function Hello() {
  const nameSubject = React.useMemo(() => new Ironhook.Subject(useName), []);
  const nameResult = IronhookReact.useIronhook(nameSubject);

  switch (nameResult.type) {
    case 'value':
      return <h1>Hello, {nameResult.value}!</h1>;
    case 'error':
      return <h1>Oops!</h1>;
    case 'completed':
      return <h1>Bye.</h1>;
  }
}
```

```js
<Hello />
```

## API Reference

### Types

```ts
function useIronhook<TValue>(
  subject: Ironhook.Subject<TValue>
): IronhookResult<TValue>;
```

```ts
type IronhookResult<TValue> =
  | {readonly type: 'value'; readonly value: TValue}
  | {readonly type: 'error'; readonly error: Error}
  | {readonly type: 'completed'};
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
[MIT License](https://github.com/clebert/ironhook-react/blob/master/LICENSE).
