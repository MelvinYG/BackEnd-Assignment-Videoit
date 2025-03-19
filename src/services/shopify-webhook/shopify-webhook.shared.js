export const shopifyWebhookPath = 'shopify-webhook'

export const shopifyWebhookMethods = ['create']

export const shopifyWebhookClient = client => {
  const connection = client.get('connection')

  client.use(shopifyWebhookPath, connection.service(shopifyWebhookPath), {
    methods: shopifyWebhookMethods
  })
}
