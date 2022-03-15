import { IngredientType } from "../enums/ingredient-type";
import { TableQuery } from "./table-query.model";

export interface IngredientQuery extends TableQuery {
    name?: string;
    ofType?: IngredientType
}
