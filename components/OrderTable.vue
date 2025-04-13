<template>
  <div>
    <div v-if="loading" class="text-center py-4 text-gray-500">Loading Data...</div>

    <table v-else class="w-full table-auto border border-gray-300 rounded shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Client</th>
          <th class="px-4 py-2 text-left">Order number</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Amount</th>
          <th class="px-4 py-2 text-left">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id" class="border-t">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.customer_name }}</td>
          <td class="px-4 py-2">{{ order.order_number }}</td>
          <td class="px-4 py-2">{{ order.status }}</td>
          <td class="px-4 py-2 font-medium text-right">
            {{ Number(order.total_amount).toFixed(2) }} zł
          </td>
          <td class="px-4 py-2">
            {{ new Date(order.created_at).toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types/orders'

interface Props {
  orders: Order[]
  loading: boolean
}

const { orders, loading } = defineProps<Props>()

const filteredOrders = computed(() => orders.filter(Boolean) ?? [])
</script>
