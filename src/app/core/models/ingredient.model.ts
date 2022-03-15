import { IngredientType } from "../enums/ingredient-type";

export interface Ingredient {
    readonly id?: number;
    name: string;
    type?: IngredientType;
}
