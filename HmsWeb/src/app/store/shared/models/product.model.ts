import { ICrud } from './pagination.model';

export interface IProduct extends ICrud {
  Name: string;
  Description: string;
  Price: number;
  PictureUri: string;
  Brand: {
    Name: string;
  };
  BrandId: number;
  Types: string[];
  Types2: string[];
  Unit:
  {
    Name: string;
  };
  UnitId: number;
  Vendor: {
    Name: string;
  };
  VendorId: number;
  Count: number;
  InActive: boolean;
}
