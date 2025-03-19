## Approach

- Created the feathersjs app.
- Generated the service named 
    ``` 
    shopify-webhook
    ```
- Editted shopify-webhook.class.js to just serve the create method.
- Made necessary changes in shopify-webhook.js and shopify-webhook.shared.js

- Run the server with
    ```
    npm run dev    
    ```

- Tested by senting a request using curl:
    ```
    curl -X POST http://localhost:3030/shopify-webhook \
     -H "Content-Type: application/json" \
     -H "X-Shopify-Shop-Domain: myshopifystore.myshopify.com" \
     -d '{"order_id": "12345", "status": "paid"}'
    ```
- Result:
![Result](Screenshot%202025-03-19%20at%208.45.29 PM.png)
