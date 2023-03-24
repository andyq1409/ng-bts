import {SafeUrl} from "@angular/platform-browser";

export interface Product {

  product_id: number;
  product_name: string;
  product_description: string;
  category: string;
  product_avail: string;
  list_price: number;
  product_image: string;
  mimetype: string;
  filename: string;
  image_last_update: string
}

export interface ProductExt extends Product {
  price_str: string;
  url: SafeUrl;
}
