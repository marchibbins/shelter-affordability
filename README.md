# Affordability app

## Requirements

- `Node` with `npm`

## Development

1. Install dependencies

        npm install

2. Compile assets

        npm run gulp

3. Watch files for changes

        npm run gulp watch

4. Serve locally on [localhost:8080](http://localhost:8080/)

        npm run gulp serve

    This will modrewrite `.min` files to unminified versions

### Included in default build step

- Copy assets

        npm run gulp assets

- Lint Javascript source

        npm run gulp lint

## Production

- Build with

        npm run gulp -- --production

### Node global

You can substitute `npm run gulp` for just `gulp` if you have a compatible version of `gulp` installed globally. For example:

    gulp watch
    gulp --production
