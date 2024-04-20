export interface ItemDTO {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  }
  