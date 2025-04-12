<script setup lang="ts">
interface Props {
  orders:
    | {
        id: number
        customer_name: string
        status: string
        total_amount: number
        created_at: string
      }[]
    | null
  loading: boolean
}
const { orders, loading } = defineProps<Props>()

const filteredOrders = computed(() => orders?.filter(Boolean) ?? [])
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-4 text-gray-500">Loading Data...</div>

    <table v-else class="w-full table-auto border border-gray-300 rounded shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Klient</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Kwota</th>
          <th class="px-4 py-2 text-left">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id" class="border-t">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.customer_name }}</td>
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
