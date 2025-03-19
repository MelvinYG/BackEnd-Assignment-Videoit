import { ShopifyWebhookService, getOptions } from './shopify-webhook.class.js'
import { shopifyWebhookPath, shopifyWebhookMethods } from './shopify-webhook.shared.js'

export * from './shopify-webhook.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const shopifyWebhook = app => {
  // Register our service on the Feathers application
  app.use(shopifyWebhookPath, new ShopifyWebhookService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: shopifyWebhookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(shopifyWebhookPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      create: [],
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
