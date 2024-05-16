export interface IProduct{
        // productId?: number;
        id:number;
        productName: string;
        productCode: string;
        releaseDate:string ;
        description: string;
        price: number;
        starRating:number;
        imageUrl: string;
        tags?: string[];
}
export interface ProductResolved {
        product: IProduct;
        error?: any;
      }