## Task 2 HMAC Validation

- Used a middleware to check if the path is 'shopify-webhook' and the method is post to determine and intercept the headers before they are parsed by bodyParser in app.js
Then we saved it into a parameter as "rawBody" and then compared it to the expected one and gave results.


## Results:

1. on correct validation:

![correct validation](./Screenshot%202025-03-20%20at%202.07.30 AM.png)

2. On incorrect validation:

![Incorrect](./Screenshot%202025-03-20%20at%202.08.59 AM.png)