import { IngredientFilter } from "./ingredient-filter.model";
import { TableQuery } from "./table-query.model";

export interface IngredientQuery extends TableQuery {
    filter?: IngredientFilter;
}
