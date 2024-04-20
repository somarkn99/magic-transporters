import {PaginatedResult} from '../interfaces/PaginationInterface';

export function createPaginatedResult<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
  