import { IPagination } from './pagination.model';

export interface ICategoryPage extends IPagination, ICategories {
}

export interface ICategories {
  data: ICategory[];
}

export interface ICategory {
    id: number;
    name: string;
    inActive: boolean;
  }
