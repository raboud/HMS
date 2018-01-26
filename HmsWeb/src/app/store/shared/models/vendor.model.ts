import { ICrud } from './pagination.model';

export interface IVendor extends ICrud {
  Name: string;
  InActive: boolean;
}
