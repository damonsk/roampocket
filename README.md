# Roam Research and Pocket Integration

Pull Pocket data into Roam. 

## Steps

### Pocket API

Login and create a new App - https://getpocket.com/developer/apps/

Obtain a consumer key and access key.  These will be needed for the lambda below. 

### AWS

#### Lambda 

Create a NodeJS lambda in AWS, copy paste the code from lambda-node-js.js.  Be sure to insert your consumer key and access key as part of the URL to the Pocket API.  'https://getpocket.com/v3/get?count=10&sort=newest&detailType=complete&consumer_key=YOUR_CONSUMER_KEY&access_token=YOUR_ACCESS_TOKEN&since='

#### API Gateway

Create an API Gateway, in recent times, AWS allows a lambda to be invoked directly without an API gateway.  Not tested this but could be suitable.

Link the API Gateway to the Lambda as a GET request.

- API type: REST
- Method: ANY

### RoamJS

