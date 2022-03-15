import { Ingredient } from "./ingredient.model";

export interface Recipe {
    readonly id?: number;
    name: string;
    desc?: string;
    ingredients: Ingredient[],
    readonly createdAt?: Date,
}
