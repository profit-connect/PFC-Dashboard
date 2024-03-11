export interface IFranchise {
  franchise: IFranchiseElement[];
  count: number;
}

export interface IFranchiseElement {
  id: string;
  name: string;
  facility: IFacility[];
}

export interface IFacility {
  id: string;
  name: string;
  email: string;
  contactno: string;
  address: string;
  city: string;
  country: string;
  img_src: string;
  updated_date: Date;
  social: ISocial[];
  general: IGeneral[];
  room: IRoom[];
}

export interface IGeneral {
  id: string;
  allow_leads_to_register: string;
  schedule_available_to_clients: string;
  booking_close_no: string;
  booking_close_period: string;
  foc: string;
  allow_pause: string;
  allow_renewal_inactive: string;
  always_open: string;
  updated_date: Date;
  timings: ITiming[];
}

export interface ITiming {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  updated_date: Date;
}

export interface IRoom {
  id: string;
  name: string;
  description: string;
  capacity: string;
  category_id: string;
  category_name: string;
  follow_facility_timing: string;
  updated_date: Date;
  timings?: Array<ITiming | null>;
}

export interface ISocial {
  id: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  website: string;
  updated_date: Date;
}
