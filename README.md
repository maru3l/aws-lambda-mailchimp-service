# AWS Lambda service for Mailchimp subscription

## Description

this is a little serverless service to subscribe an email to a mailchimp mailing list with AWS Lambda.

## Required
* [nodejs](https://nodejs.org/)
* [serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)
* [webpack](https://webpack.js.org/)

## Test locally
1. Install the packages by running `npm install`
2. create a local `config.yml` by copiing the `config.yml.exemple` and replacing the variable in it.
3. Add you testing email the the `mocks/subscibe.json` files.
4. Run the commande `serverless invoke local --function subscribe --path mocks/subscribe.json`. You should be subscribe to the mailing list you specified in the `config.yml` file.
