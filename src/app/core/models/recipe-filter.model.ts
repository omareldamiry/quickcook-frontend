import { NumComparison } from "./custom-types";
import { Ingredient } from "./ingredient.model";

export interface RecipeFilter {
    id?: (number | undefined)[];
    name?: string;
    ingredients?: Ingredient[];
    rating?: number;
    ratingComparison?: NumComparison;
    createdAt?: Date;
}
