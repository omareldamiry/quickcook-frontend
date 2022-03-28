import { Recipe } from "./recipe.model";

export interface User {
    readonly id: number;
    email: string;
    favourites?: Recipe[]
}