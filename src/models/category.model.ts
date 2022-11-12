export interface CategoryModel {
  id: number;
  name: string;
  parentId?: number;
  sellerId?: number;
  image: string;
  count:number
}
