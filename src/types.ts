export interface Category {
  id: number;
  name: string;
  description: string;
  cover_image: string;
  packages?: Package[];
}

export interface Package {
  id: number;
  category_id: number;
  name: string;
  price: number;
  duration: string;
  photos_count: number;
  details: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  category: string;
  message: string;
  zoom_date?: string;
  zoom_time?: string;
  payment_status: string;
  payment_screenshot?: string;
  status: string;
  created_at: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  image: string;
}

export interface Settings {
  qr_code: string;
  booking_fee: string;
  whatsapp_number: string;
}
