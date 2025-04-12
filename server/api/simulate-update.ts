export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    await $fetch(`${config.public.apiUrl}/orders/simulate-update`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiSecret}`,
      },
    })

    return { success: true }

  } catch (err: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to simulate the order. Please try again later.',
    })
  }
})
