import crypto from 'crypto'
import { BadRequest, Forbidden } from '@feathersjs/errors'
import {config} from '../../config/environment.js';

// const SHOPIFY_APP_SECRET = config.SHOPIFY_SECRET;
const SHOPIFY_APP_SECRET = "262a5f32a8340dd63edf5bc9e9365fb0";
console.log("SHOPIFY_APP_SECRET:", SHOPIFY_APP_SECRET);

export const validateShopifyHMAC = async context => {
  const { params } = context
  const headers = params.headers || {}

  const receivedHMAC = headers['x-shopify-hmac-sha256']
  const rawBody = params.rawBody

  if (!receivedHMAC || !rawBody) {
    throw new BadRequest('Missing required headers or raw body for HMAC validation')
  }

  // Compute expected HMAC
  const expectedHMAC = crypto
  .createHmac('sha256', SHOPIFY_APP_SECRET)
  .update(Buffer.from(rawBody, 'utf-8')) 
  .digest('base64');

  if (receivedHMAC !== expectedHMAC) {
    console.error('HMAC validation failed:', { receivedHMAC, expectedHMAC });
    throw new Forbidden('Invalid webhook signature');
  }

  console.log('HMAC validation done');
  return context;
}
