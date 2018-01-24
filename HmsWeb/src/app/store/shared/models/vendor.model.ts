import { IPagination } from './pagination.model';

export interface IVendorPage extends IPagination, IVendor {
}

export interface IVendors {
  data: IVendor[];
}

export interface IVendor {
  id: number;
  name: string;
  inActive: boolean;
}
