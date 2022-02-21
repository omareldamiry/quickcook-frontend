import { IngredientType } from "../enums/ingredient-type";

export interface Ingredient {
    id?: number;
    name: string;
    type?: IngredientType;
}
