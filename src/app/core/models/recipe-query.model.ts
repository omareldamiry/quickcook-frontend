import { Ingredient } from "./ingredient.model";
import { TableQuery } from "./table-query.model";

export interface RecipeQuery extends TableQuery {
    name?: string;
    ingredients?: Ingredient[],
}
