export interface IPrepsMessageToken {
  id?: number;
  description?: string;
  timeSent?: number;
  tokenValue?: string;
  received?: boolean;
  actioned?: boolean;
  contentFullyEnqueued?: boolean;
}

export const defaultValue: Readonly<IPrepsMessageToken> = {
  received: false,
  actioned: false,
  contentFullyEnqueued: false,
};
