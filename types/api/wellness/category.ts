export interface Icategories {
    categories: ICategory[];
  }
  
  export interface ICategory {
    id: string;
    name: string;
    description: string;
    updated_date: Date;
    articles: Array<WellnessArticle | null>;
  }
  
  export interface WellnessArticle {
    id: string;
    category_id: string;
    header: string;
    description_html: string;
    type: IWellnessType;
    src: string;
    published: 'Yes' | 'No';
    published_date: Date;
    read_time_no: string;
    read_time: IWellnessReadTime;
    featured: 'Yes' | 'No';
    updated_date: Date;
    available_tags: Array<IWellnessTag | null>;
    except_tags: Array<IWellnessTag | null>;
  }
  
  export interface IWellnessTag {
    id: string;
    name: string;
    updated_date: Date;
  }
  
  export enum IWellnessType {
    Image = "Image",
    Video = "Video", // Assuming there might be video types as well, add more as needed
  }
  
  export enum IWellnessReadTime {
    Minutes = "Minutes",
    Hours = "Hours", // Add more units if necessary
  }
  