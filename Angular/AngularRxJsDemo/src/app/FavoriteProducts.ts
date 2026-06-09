export interface FavoriteProducts {
    id: number;
    name: string;
    price: number;
    description: string;
    isFavorite?: boolean;
    imageUrl: string;
}