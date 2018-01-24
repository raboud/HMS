import { IPagination } from './pagination.model';

export interface IVendorPage extends IPagination, IVendor {
}

export interface IVendors {
  Data: IVendor[];
}

export interface IVendor {
  Id: number;
  Name: string;
  InActive: boolean;
}
