export interface ICategoryResponse {
    categories: ICategory[];
  }
  
  export interface ICategory {
    id: string;
    name: string;
    description: string;
    updated_date: string;
    items: IItem[];
  }
  
  export interface IItem {
    id: string;
    category_id: string;
    name: string;
    description: string;
    img_src: string;
    status: string;
    price: string;
    pay_with_card: string;
    pay_with_gift_card: string;
    promotion_price: string | null;
    display_original_price: string;
    promotion_start: string | null;
    promotion_end: string | null;
    updated_date: string;
    featured: string;
    available_tags: ITag[] | null;
    except_tags: ITag[] | null;
  }
  
  export interface ITag {
    id: string;
    name: string;
    updated_date: string;
  }
  