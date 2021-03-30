# web auction frontend customer

## Development

### Setup
Pleas use node version = `14.13.0`

```shell
$ npm install
```

### Run development server

```
$ npm run dev
```

### Build and run server

```
$ npm run build
$ npm run start
```

## Deployment

### Development

Domain: https://development.timeless-auction.jp

All changes to `main` branch will automatically be deployed to `shared-development` environment ( https://development.timeless-auction.jp ).
All tags with its name matches `deploy-development-*` will also be deployed to the environment.

### Staging

Domain: https://staging.timeless-auction.jp

(Basic auth = `buysell:8NZRiEJvNGZ99rPs8tGj`)

All changes to `release` branch will automatically be deployed to `staging` environment.
All tags with its name matches `deploy-staging-*` will also be deployed to the environment.

### Production / ( Production test )

Domain: https://timeless-auction.jp ( https://production-test.timeless-auction.jp )

All changes to `release` branch will automatically be deployed to `production` (and `production-test`) environment ( https://timeless-auction.jp https://production-test.timeless-auction.jp ).
All tags with its name matches `deploy-production-*` will also be deployed to the environment.
