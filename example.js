// @ts-check

// import * as Ironhook from 'ironhook';
const Ironhook = require('ironhook');
// import * as IronhookReact from 'ironhook-react';
const IronhookReact = require('./lib/cjs/index.js');
// import * as React from 'react';
const React = require('react');

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
    case 'pending':
      // return <h1>Hello, Stranger!</h1>;
      return React.createElement('h1', {}, ['Hello, Stranger!']);
    case 'value':
      // return <h1>Hello, {nameResult.value}!</h1>;
      return React.createElement('h1', {}, [`Hello, ${nameResult.value}!`]);
    case 'error':
      // return <h1>Oops!</h1>;
      return React.createElement('h1', {}, ['Oops!']);
    case 'completed':
      // return <h1>Bye.</h1>;
      return React.createElement('h1', {}, ['Bye.']);
  }
}

/******************************************************************************/

const {strictEqual} = require('assert');
const {renderToString} = require('react-dom/server');

strictEqual(
  renderToString(React.createElement(Hello)),
  '<h1 data-reactroot="">Hello, Stranger!</h1>'
);
