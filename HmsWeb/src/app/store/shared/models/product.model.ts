import { IPagination } from './pagination.model';

export interface IProductPage extends IPagination, IProducts {
}

export interface IProducts {
  data: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  pictureUri: string;
  catalogBrandId: number;
  catalogBrand: string;
  catalogTypeId: number;
  catalogType: string;
  units: number;
  inActive: boolean;
}
