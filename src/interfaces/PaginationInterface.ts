/**
 * Defines the structure for pagination parameters.
 * This interface is used to pass pagination options like page number and limit per page
 * through the application, ensuring consistent pagination handling.
 */
export interface PaginationParams {
  page: number;   // Represents the current page number in a paginated request.
  limit: number;  // Represents the maximum number of items to be returned on a single page.
}

/**
 * Generic interface for paginated results.
 * This structure is used to standardize responses for API requests that return lists of items.
 * It encapsulates the data list, total count of items, current page number, and total pages available,
 * making it easier to handle paginated data on the client-side.
 *
 * @template T - Represents the type of data being paginated (e.g., users, products).
 */
export interface PaginatedResult<T> {
  data: T[];        // Array of items of type T for the current page.
  total: number;    // Total number of items across all pages.
  page: number;     // Current page number.
  totalPages: number; // Total number of pages available, calculated from total and limit.
}
