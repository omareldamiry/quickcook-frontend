import { TableQuery } from "./table-query.model";

export const DEFAULT_QUERY_SETTINGS: TableQuery = {
    sortDirection: 'asc',
    sortField: 'id',
    pageNumber: 0,
    pageSize: 5
} 