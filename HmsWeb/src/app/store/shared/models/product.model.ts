import { IPagination } from './pagination.model';

export interface IProductPage extends IPagination, IProducts {
}

export interface IProducts {
  Data: IProduct[];
}

export interface IProduct {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  PictureUri: string;
  catalogBrandId: number;
  catalogBrand: string;
  catalogTypeId: number;
  catalogType: string;
  Units: number;
  InActive: boolean;
}
