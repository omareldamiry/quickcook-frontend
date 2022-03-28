export interface Rating {
    readonly id?: number;
    value: number;
    comment?: string;
    recipeId: number;
    userId: number;
}