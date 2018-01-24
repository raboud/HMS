import { IPagination } from './pagination.model';

export interface IBrandPage extends IPagination, IBrands {
}

export interface IBrands {
  data: IBrand[];
}

export interface IBrand {
    id: number;
    name: string;
    inActive: boolean;
  }
