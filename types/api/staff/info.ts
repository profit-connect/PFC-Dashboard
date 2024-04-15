export interface IStaffResponse {
    staff: IStaffData;
    count: number;
  }
  
  export interface IStaffData {
    data: IStaff;
    social: ISocial;
    about: IAbout;
    emergency_contact: IEmergencyContact | null;
  }
  
  export interface IStaff {
    id: string;
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    country_code: string;
    contactno: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    email: string;
    image: string;
    role_id: string;
    role: string;
  }
  
  export interface ISocial {
    id: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  }
  
  export interface IAbout {
    id: string;
    about: string;
  }
  
  export interface IEmergencyContact {
    id: string;
    name: string;
    contactno: string;
    country_code: string;
  }
  

  