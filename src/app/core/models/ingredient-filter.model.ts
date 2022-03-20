import { IngredientType } from "../enums/ingredient-type";

export interface IngredientFilter {
    name?: string;
    ofType?: IngredientType;
}
