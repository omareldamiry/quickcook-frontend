import { RecipeFilter } from "./recipe-filter.model";
import { TableQuery } from "./table-query.model";

export interface RecipeQuery extends TableQuery {
    filter?: RecipeFilter
}
