export class Error {
  constructor(
    public status: number = 500,
    public message: string = "На сервере что-то сломалось...Приносим извинения!"
  ) {}
}
