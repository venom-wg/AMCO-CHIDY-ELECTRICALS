
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  specs?: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
}

export type Page = 'home' | 'products' | 'about' | 'contact' | 'product-detail';
