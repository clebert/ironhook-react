import {render, screen, waitForDomChange} from '@testing-library/react';
import * as Ironhook from 'ironhook';
import * as React from 'react';
import {IronhookResult, useIronhook} from '.';

interface TestComponentProps {
  readonly subject?: Ironhook.Subject<string>;
}

function TestComponent({subject}: TestComponentProps): JSX.Element {
  return <p data-testid="result">{JSON.stringify(useIronhook(subject))}</p>;
}

function getIronhookResult(): IronhookResult<string> {
  return JSON.parse(screen.getByTestId('result').innerHTML);
}

describe('useIronhook()', () => {
  let subject: Ironhook.Subject<string>;
  let updateSubject: Ironhook.SetState<string>;

  beforeEach(() => {
    subject = new Ironhook.Subject(() => {
      const [state, setState] = Ironhook.useState('a');

      updateSubject = setState;

      return state;
    });
  });

  test('pending result', () => {
    render(<TestComponent />);

    expect(getIronhookResult()).toEqual({type: 'pending'});
  });

  test('value result', async () => {
    render(<TestComponent subject={subject} />);

    expect(getIronhookResult()).toEqual({type: 'pending'});

    await waitForDomChange();

    updateSubject('b');

    expect(getIronhookResult()).toEqual({type: 'value', value: 'a'});

    await waitForDomChange();

    updateSubject('b');
    updateSubject('c');

    expect(getIronhookResult()).toEqual({type: 'value', value: 'b'});

    await waitForDomChange();

    expect(getIronhookResult()).toEqual({type: 'value', value: 'c'});
  });

  test('error result', async () => {
    render(<TestComponent subject={subject} />);

    await waitForDomChange();

    updateSubject(() => {
      throw 'e';
    });

    await waitForDomChange();

    expect(getIronhookResult()).toEqual({type: 'error', error: 'e'});
  });

  test('completed result', async () => {
    render(<TestComponent subject={subject} />);

    await waitForDomChange();

    subject.complete();

    expect(getIronhookResult()).toEqual({type: 'completed'});
  });

  test('unsubscribe on unmount', async () => {
    const unsubscribe = jest.fn();

    subject.subscribe = () => unsubscribe;

    const {unmount} = render(<TestComponent subject={subject} />);

    unmount();

    expect(unsubscribe).toBeCalledTimes(1);
  });
});
