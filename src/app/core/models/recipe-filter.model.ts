import { Ingredient } from "./ingredient.model";

export interface RecipeFilter {
    name?: string;
    ingredients?: Ingredient[];
    createdAt?: Date;
}
