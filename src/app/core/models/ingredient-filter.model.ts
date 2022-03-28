import { IngredientType } from "../enums/ingredient-type";

export interface IngredientFilter {
    id?: number;
    name?: string;
    ofType?: IngredientType;
}
