import Pusher from 'pusher-js'
import type { Order } from '~/types/orders'

export const useOrdersChannel = (onOrderUpdate: (data: { order: Order }) => void) => {
  const config = useRuntimeConfig()

  const pusherKey = config.public.pusherKey
  const pusherCluster = config.public.pusherCluster
  const channelName = config.public.channelName
  const eventName = config.public.eventName

  onMounted(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    })

    const channel = pusher.subscribe(channelName)

    channel.bind(eventName, (data: { order: Order }) => {
      console.log('Order updated via WebSocket:', data)

      alert(`Order ${data.order.order_number} has been updated.`)

      onOrderUpdate(data)
    })

    onBeforeUnmount(() => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    })
  })
}
