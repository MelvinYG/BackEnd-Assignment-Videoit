// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ShopifyWebhookService {
  constructor(options) {
    this.options = options
  }

  async create(data, params) {
    const domain = params.headers?.['x-shopify-shop-domain'];

    if (!domain){
      throw new Error('Missing store domain in headers.');
    }

    console.log(`Webhook received from ${domain}`);

    return {
      message: 'Webhook received',
      received: true,
    };
  }
}

export const getOptions = app => {
  return { app };
}
