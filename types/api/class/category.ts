export interface Icategories {
  categories: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  img_src: string;
  updated_date: Date;
  class: Array<IClass | null>;
}

export interface IClass {
  id: string;
  name: string;
  description: string;
  img_src: string;
  img_video: string;
  duration: string;
  period: IPeriod;
  type: IType;
  url: IURL;
  location: null | string;
  googlemaps: null | string;
  updated_date: Date;
  available_tags: Array<ITag | null>;
  except_tags: Array<ITag | null>;
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
