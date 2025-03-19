import { shopifyWebhook } from './shopify-webhook/shopify-webhook.js'
export const services = app => {
  app.configure(shopifyWebhook)

  // All services will be registered here
}
