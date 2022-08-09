interface IReturnData {
  status: 'success' | 'fail';
  message?: string;
}

export class ReturnData implements IReturnData {
  status: IReturnData['status'];
  message?: string;
  constructor(status: IReturnData['status'], message?: string) {
    this.status = status;
    this.message = message;
  }

  isSuccess() {
    return this.status === 'success';
  }

  isFail() {
    return this.status === 'fail';
  }
}