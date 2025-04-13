import type { OrdersResponse } from '~/types/orders'

export default defineEventHandler(async (event): Promise<OrdersResponse> => {
  const config = useRuntimeConfig()
  const { page, per_page, search } = getQuery(event)

  return await $fetch<OrdersResponse>(`${config.public.apiUrl}/orders`, {
    query: {
      page,
      per_page,
      search,
    },
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  })
})
