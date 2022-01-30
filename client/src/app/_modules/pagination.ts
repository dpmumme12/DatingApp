export interface Pagination {
    currentPage: number;
    itemsPerPgae: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}