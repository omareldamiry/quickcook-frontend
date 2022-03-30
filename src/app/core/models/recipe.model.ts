import { Ingredient } from "./ingredient.model";
import { Rating } from "./rating.model";

export interface Recipe {
    readonly id?: number;
    name: string;
    desc?: string;
    rating: number;
    isFavourite?: boolean;
    ratings?: Rating[];
    ingredients: Ingredient[],
    readonly createdAt?: Date,
}
