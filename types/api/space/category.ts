export interface Icategories {
    categories: ICategory[];
  }
  
  export interface ICategory {
    id: string;
    name: string;
    description: string;
    updated_date: Date;
    room: Array<ISpace | null>;
  }
  
  export interface ISpace {
    id: string;
    name: string;
    description: string;
    capacity: string;
    url: IURL;
    updated_date: Date;
   
  }
  
  export interface ITag {
    id: string;
    name: string;
    updated_date: Date;
  }
  
  export enum IPeriod {
    Hours = "Hours",
    Minutes = "Minutes",
  }
  
  export enum IType {
    OfSite = "Of-site",
    OnSite = "On-site",
  }
  
  export enum IURL {
    Abc = "abc",
    Empty = "",
  }
  