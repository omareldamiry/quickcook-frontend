import { Ingredient } from "./ingredient.model";

export interface Recipe {
    id?: number;
    name: string;
    desc?: string;
    ingredients: Ingredient[]
}
