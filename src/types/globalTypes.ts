export interface IProduct {
  _id: number;
  title: string;
  image: string;
  price: number;
  genre: string;
  author: string;
  publicationDate?: number;
  quantity?: number;
  status?: boolean;
}
