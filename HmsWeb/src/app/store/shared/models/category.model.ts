import { IPagination } from './pagination.model';

export interface ICategoryPage extends IPagination, ICategories {
}

export interface ICategories {
  Data: ICategory[];
}

export interface ICategory {
    Id: number;
    Name: string;
    InActive: boolean;
  }
