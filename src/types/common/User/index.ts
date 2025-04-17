export interface User {
  id: number;
  user_name: string;
  email: string;
  phone: any;
  otp: any;
  type: any;
  otp_expires_at: any;
  email_verified_at: any;
  company_name: any;
  tax: any;
  commerce_registration: any;
  created_at: string;
  updated_at: string;
  global_id?: string;
}

export interface Address {
  id: number;
  label: string;
  address_1: string;
  address_2: string;
  city: string;
  zib_code: string;
  latitude: string;
  longitude: string;
  client_id: number;
  created_at: string;
  updated_at: string;
  default: number;
  building: string;
  apartment: string;
  notes: string;
}
