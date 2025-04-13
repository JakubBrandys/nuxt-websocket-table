export interface Order {
  id: number
  order_number: string
  total_amount: string
  customer_name: string
  status: string
  created_at: string
}

interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface OrdersResponse {
  data: Order[]
  meta: PaginationMeta
}
