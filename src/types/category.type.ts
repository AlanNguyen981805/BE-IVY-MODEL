export interface ICategory {
    id: string;
    name: string;
    parent_id: number;
    slug: string;
    link: string;
    isSale: boolean;
    children?: ICategory[]
    leafNode?: ICategory[]
}