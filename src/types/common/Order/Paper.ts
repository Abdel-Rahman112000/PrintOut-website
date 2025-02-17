export interface PaperType {
  id: number;
  name: string;
  is_active: number;
  created_at: any;
  updated_at: any;
  size?: Size;
}

export interface Size {
  id: number;
  paper_id: number;
  height: number;
  width: number;
  bleed: number;
  created_at: any;
  updated_at: any;
}


export type CustomizeOptionType = {
  created_at: string;
  id: number;
  name: string;
  type: string;
  updated_at: string;
};