

export interface IPage<t> {
  PageIndex: number;
  PageSize: number;
  Count: number;
  Data: t[];
}

export interface ICrud {
  Id: number;
  InActive: boolean;
  Name: string;
}
