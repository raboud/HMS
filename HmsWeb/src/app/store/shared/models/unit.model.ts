import { IPagination } from './pagination.model';


export interface IUnitPage extends IPagination, IUnit {
}

export interface IUnits {
  data: IUnit[];
}

export interface IUnit {
  id: number;
  name: string;
  inActive: boolean;
}

