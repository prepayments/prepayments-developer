export interface IPrepsMessageToken {
  id?: number;
  description?: string;
  timeSent?: number;
  tokenValue?: string;
  received?: boolean;
  actioned?: boolean;
  contentFullyEnqueued?: boolean;
}

export class PrepsMessageToken implements IPrepsMessageToken {
  constructor(
    public id?: number,
    public description?: string,
    public timeSent?: number,
    public tokenValue?: string,
    public received?: boolean,
    public actioned?: boolean,
    public contentFullyEnqueued?: boolean
  ) {
    this.received = this.received || false;
    this.actioned = this.actioned || false;
    this.contentFullyEnqueued = this.contentFullyEnqueued || false;
  }
}
