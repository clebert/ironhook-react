import * as Ironhook from 'ironhook';
import * as React from 'react';

export type IronhookResult<TValue> =
  | {readonly type: 'value'; readonly value: TValue}
  | {readonly type: 'error'; readonly error: Error}
  | {readonly type: 'completed'};

export function useIronhook<TValue>(
  subject: Ironhook.Subject<TValue>
): IronhookResult<TValue> {
  const [result, setResult] = React.useState<IronhookResult<TValue>>(() => {
    let initialResult: IronhookResult<TValue>;

    subject?.subscribe({
      next: value => (initialResult = {type: 'value', value}),
      error: error => (initialResult = {type: 'error', error}),
      complete: () => (initialResult = {type: 'completed'})
    })();

    return initialResult!;
  });

  React.useEffect(
    () =>
      subject?.subscribe({
        next: value =>
          setResult(previousResult =>
            previousResult.type === 'value' &&
            Object.is(previousResult.value, value)
              ? previousResult
              : {type: 'value', value}
          ),
        error: error =>
          setResult(previousResult =>
            previousResult.type === 'error' &&
            Object.is(previousResult.error, error)
              ? previousResult
              : {type: 'error', error}
          ),
        complete: () =>
          setResult(previousResult =>
            previousResult.type === 'completed'
              ? previousResult
              : {type: 'completed'}
          )
      }),
    [subject]
  );

  return result;
}
