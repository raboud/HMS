import { IPagination } from './pagination.model';

export interface IBrandPage extends IPagination, IBrands {
}

export interface IBrands {
  Data: IBrand[];
}

export interface IBrand {
    Id: number;
    Name: string;
    InActive: boolean;
  }
