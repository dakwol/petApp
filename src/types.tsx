export type RootStackParamList = {
  Root: any;
  BottomTabNavigator: any;
  CommonNavigator: any;
};
export type AuthStackParamList = {
  Start: any;
  Login: any;
  LoginPassword: any;
  Login2fa: any;
  ForgotPassword: any;
  Registration: any;
  RegistrationRole: any;
  RegistrationExecuter: any;
  ConfirmNumber: any;
  ActivityCategory: any;
  CompanyName: any;
  UserInfo: any;
  UserProfession: any;
  UserNickname: any;
  UserSpecialization: any;
  UserSpecializationPrice: any;
  UserSpecializationMedia: any;
  CompanyPhoto: any;
  UserRegEmail: any;
  UserDescriptionActivity: any;
  UserAddres: any;
  UserWorkInfo: any;
  UserEndScreen: any;
  Voluenter:any;
  VoluenteerType: any;
  RequisitesVolunter:any;
  UploadDocumentsVoluenter:any;
  VoluenterScore:any;
  VoluenterAddres:any;
  RoleSelection: any;
  RoleAddress: any;
  BottomTabNavigator: any;
};
export type BottomTabParamList = {
  Home: any;
  Favorites: any;
  Map: any;
  Messages: any;
  Profile: any;

  ProfileUserScreen: any;
  ProfileSettings: any;
  ProfileNotifications: any;
  ProfileReviews: any;
  ProfileApp: any;
}

export type HomeParamList = {
  Home: any;
  AddEvent: any;
  Messages: any;
  ProfileSettings: any;
  ProfileUserScreen: any;
  ProfileNotifications: any;
}
export type CategoryItem = {
  id: number;
  name: string;
  level: number;
  parent_id: number;
  icon: string;
  icon_link: string;
  low_pri_icon: string | null;
  medium_pri_icon: string | null;
  high_pri_icon: string | null;
  is_active: number;
  pri_order: number;
  created_at: string;
  updated_at: string;
};
export type Event = {
  id: number;
  user_id: number;
  pet_id: number;
  evt_ctgy_id: number;
  evt_topic: string;
  evt_dt_added: number;
  evt_address: string;
  evt_lat: number;
  evt_long: number;
  evt_images: string[] | null;
  description: string;
  evt_priority: number;
  created_at: string;
  updated_at: string;
  is_archive?: boolean;
  [x:string]: any,
};


export interface IMedia {
  id: number,
  media_type: string,
  full: string,
  preview: string,
  is_checked: number;
  [x:string]: any,
}

export interface IPet {
  address: string,
  age: number,
  months: number,
  chip: string,
  color: string,
  contact_details: string,
  created_at: string,
  description: string,
  dt_added: number,
  id: number,
  images: string,
  media: IMedia[],
  name: any,
  owner_id: number,
  sex: number,
  species: any,
  sterilization: number,
  type: string,
  type_id: number,
  updated_at: string,
  [x:string]: any,
}
export interface INotification{
  id:number,
  body: string,
  title: string,
  date: string,
  is_read: number
}
export interface IClaim{
  id:number,
  text: string,
  title: string,
  date: string,
  is_open: boolean,
  created_at: Date,
  event_id: any,
  moderator_comment: string,
}
export interface IStory{
  stories: any;
  id: number,
  user_id: number,
  user: IUser,
  is_active: boolean,
  medias: IMedia[],
  description?: string[]
}
export interface IEvent {
  commentable: number,
  created_at: string,
  description: string,
  evt_address: string,
  evt_ctgy_id: number,
  evt_dt_added: string,
  evt_images: string,
  evt_images_json: any[],
  evt_lat: string,
  evt_long: string,
  evt_priority:  number,
  evt_status: any,
  evt_topic: string,
  id: number,
  is_emergency: number,
  pet_id: number,
  price_from: any
  price_to: any
  priority: number,
  updated_at: string,
  user_id: number,
  is_checked: boolean;
  media: IMedia[],
  user: IUser,
  type: number,
  is_archive?: boolean;
  [x:string]: any,
}

export interface IScreen {
  navigation:any;
  route:any;
}

export interface IUser {
  nickname: string,
  avatar: number,
  avatar_media: IMedia,
  created_at: string | null,
  deleted_at: string | null,
  description: string | null,
  email: string,
  firebase_token: string | null,
  first_name: string,
  full_name: string,
  geo_added: string | null,
  id: number,
  last_name: string,
  lat: string | null,
  long: string | null,
  notif_comments: number,
  notif_favevents: number,
  notif_msgs: number,
  notification: number,
  phone: string | null,
  review_rate:  string | null,
  role:  string | null,
  social_id: string,
  updated_at: string | null,
  ur_address: string | null,
  ur_bik: string | null,
  ur_description: string | null,
  ur_factaddress: string | null,
  ur_fio: string | null,
  ur_inn: string | null,
  ur_kpp: string | null,
  ur_legalname: string | null,
  ur_name: string | null,
  ur_ogrn: string | null,
  ur_passport: string | null,
  ur_photo: string | null,
  ur_rekv: string | null,
  ur_type: string | null,
  website: string | null,
  nickname_migrate: boolean,
  [x:string]: any,
}

export interface IReview {
  created_at: string | null
  dt_added: string
  review_by: number
  review_id: number
  review_rate: number
  review_text: string
  updated_at: string | null
  user_id: number,
  reviewer_user: IUser,
  [x:string]: any,
}

export interface IModalProps {
  isVisible: boolean,
  toggleModal: (value?:boolean) => void,
}

export interface IOnFieldChange {
  field: string,
  data: any,
  form?: string,
}


