

export interface Order {
  order_id: number;
  customer_id: number;
  order_total: number;
  order_timestamp: string;
  user_name: string;
  tags?: number;
  customer: string;
}

export interface OrderExt {
  order_id: number;
  customer_id: number;
  order_total: number;
  order_timestamp: string;
  user_name: string;
  tags?: number;
  customer: string;
  total_str: string;
}

export interface OrderItem {
  order_id: number;
  order_timestamp: string;
  order_total: number;
  order_item_id: number;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  item_price: number;
  quantity: number;
  item_total: number;
  customer: string;
}
