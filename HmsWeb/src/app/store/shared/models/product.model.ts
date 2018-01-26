import { ICrud } from './pagination.model';

export interface IProduct extends ICrud {
  Name: string;
  Description: string;
  Price: number;
  PictureUri: string;
  catalogBrandId: number;
  Brand: {
    Name: string;
  }
  Types: string[];
  catalogTypeId: number;
  catalogType: string;
  Unit:
  {
    Name: string;
  };
  Count: number;
  InActive: boolean;
}
