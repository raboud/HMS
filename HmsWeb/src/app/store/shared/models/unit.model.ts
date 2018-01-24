import { IPagination } from './pagination.model';


export interface IUnitPage extends IPagination, IUnit {
}

export interface IUnits {
  data: IUnit[];
}

export interface IUnit {
  Id: number;
  Name: string;
  InActive: boolean;
}

