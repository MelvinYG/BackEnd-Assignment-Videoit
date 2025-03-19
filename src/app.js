// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import rawBody from 'raw-body'
import dotenv from 'dotenv';
dotenv.config();

import { configurationValidator } from './configuration.js'
import { logError } from './hooks/log-error.js'
import { services } from './services/index.js'
import { channels } from './channels.js'

const app = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())

app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/shopify-webhook') {
    ctx.feathers = ctx.feathers || {}

    try {
      ctx.feathers.rawBody = await rawBody(ctx.req, {
        encoding: 'utf-8'
      })
    } catch (err) {
      console.error('Failed to read raw request body:', err)
      ctx.throw(400, 'Invalid request body')
    }
  }
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.method !== 'POST' || ctx.path !== '/shopify-webhook') {
    await bodyParser()(ctx, next)
  } else {
    await next()
  }
})

// Configure services and transports
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(services)
app.configure(channels)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})

// Register application setup and teardown hooks
app.hooks({
  setup: [],
  teardown: []
})

export { app }
