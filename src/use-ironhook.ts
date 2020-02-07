import * as Ironhook from 'ironhook';
import * as React from 'react';

export type IronhookResult<TValue> =
  | {readonly type: 'pending'}
  | {readonly type: 'value'; readonly value: TValue}
  | {readonly type: 'error'; readonly error: Error}
  | {readonly type: 'completed'};

export function useIronhook<TValue>(
  subject: Ironhook.Subject<TValue> | undefined
): IronhookResult<TValue> {
  const [result, setResult] = React.useState<IronhookResult<TValue>>({
    type: 'pending'
  });

  React.useEffect(
    () =>
      subject?.subscribe({
        next: value => setResult({type: 'value', value}),
        error: error => setResult({type: 'error', error}),
        complete: () => setResult({type: 'completed'})
      }),
    [subject]
  );

  return result;
}
