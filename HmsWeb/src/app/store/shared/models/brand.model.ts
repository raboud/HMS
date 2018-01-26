import { ICrud } from './pagination.model';

export interface IBrand extends ICrud {
    Name: string;
    InActive: boolean;
  }
