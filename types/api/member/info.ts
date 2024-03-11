export interface IMemberResponse {
    member: IMemberData;
    count: number;
    members:IMember;
  }
  
  export interface IAddMember {
    facility_id: string;
    email: string;
    firstname: string;
    lastname: string;
    dob: string; 
    gender: string;
    contactno: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    password: string;
    tags: number[];
    image: string; 
  }
  
  export interface IMemberData {
    data: IMember[];
    social: ISocial;
    about: IAbout;
    emergency_contact: IEmergencyContact;
    fitness: IFitness;
    history: IHistory;
    info: IInfo;
    memberships: IMembership[];
    notes: INote[];
    privacy: IPrivacy;
    tags: ITag[];
  }
  
  export interface IMember {
    id: string;
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    country_code: string | null;
    contactno: string;
    email: string;
    img_src: string;
    membership_status: string;
    start_date: string;
    end_date: string;
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
  }
  
  export interface IFitness {
    fitness_goal: IFitnessGoal[];
    fitness_activity: IFitnessActivity[];
    fitness_frequency: IFitnessFrequency[];
    fitness_time: IFitnessTime[];
  }
  
  export interface IFitnessGoal {
    id: string;
    ID: string;
    goal: string;
    updated_date: string;
  }
  
  export interface IFitnessActivity {
    id: string;
    ID: string;
    activity: string;
    updated_date: string;
  }
  
  export interface IFitnessFrequency {
    ID: string;
    activity_frequency: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IFitnessTime {
    ID: string;
    time: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IHistory {
    conditions: ICondition[];
    medication: IMedication[];
    medical_treatment: string[];
    smoke: ISmoke[];
    alcohol: IAlcohol[];
  }
  
  export interface ICondition {
    id: string;
    ID: string;
    history: string;
    updated_date: string;
  }
  
  export interface IMedication {
    ID: string;
    medication_option: string;
    medication_value: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface ISmoke {
    ID: string;
    smoke_option: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IAlcohol {
    ID: string;
    alcohol_option: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IInfo {
    diet: IDiet[];
    home_meals: IHomeMeals[];
    takeout: ITakeout[];
    supplements: ISupplement[];
    work_space: IWorkSpace[];
    sitting_hours: string[];
    stress_level: IStressLevel[];
    sleep_hours: ISleepHours[];
  }
  
  export interface IDiet {
    ID: string;
    diet: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IHomeMeals {
    ID: string;
    home_meals: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface ITakeout {
    ID: string;
    takeout_meals: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface ISupplement {
    id: string;
    ID: string;
    supplements: string;
    updated_date: string;
  }
  
  export interface IWorkSpace {
    ID: string;
    work_space: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IStressLevel {
    ID: string;
    stress_levels: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface ISleepHours {
    ID: string;
    sleep_hours: string;
    menu_order: string;
    updated_date: string;
  }
  
  export interface IMembership {
    id: string;
    plan_name: string;
    plan_desc: string;
    plan_type: string;
    plan_price: string;
    plan_status: string;
    start_date: string;
    end_date: string;
  }
  
  export interface INote {
    id: string;
    header: string;
    description: string;
    user_id: string;
    user_name: string;
    created_date: string;
    updated_date: string;
    updated_time: string;
    reply: IReply[] | null;
  }
  
  export interface IReply {
    id: string;
    reply: string;
    user_name: string;
    updated_date: string;
    updated_time: string;
  }
  
  export interface IPrivacy {
    notification: INotification[];
    friend: IFriend[];
    marketing: IMarketing[];
  }
  
  export interface INotification {
    id: string;
    ID: string;
    text: string;
    value: string;
  }
  
  export interface IFriend {
    id: string;
    ID: string;
    text: string;
    value: string;
  }
  
  export interface IMarketing {
    id: string;
    ID: string;
    text: string;
    value: string;
  }
  
  export interface ITag {
    id: string;
    name: string;
    updated_date: string;
  }
  