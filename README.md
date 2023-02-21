<h1 align="center">Welcome to test-project-meldcx 👋</h1>
<p>
  <a href="https://twitter.com/ikramhasib007" target="_blank">
    <img alt="Twitter: ikramhasib007" src="https://img.shields.io/twitter/follow/ikramhasib007.svg?style=social" />
  </a>
</p>

> Test Project

## Navigate to the `API server`; `cd file-sharing-api-server`

Create a `.env` file for API server

```sh
PORT=
FOLDER=
```

## Install

```sh
pnpm install
pnpm build && pnpm start:prod
```

or

```sh
npm install
npm run build && npm run start:prod
```

## Usage (API server)

Swagger API url: `http://localhost:{PORT}/documentation`
<br/>
API Endpoint: `http://localhost:{PORT}/api/v1`

## Navigate to the `Client`; `cd client`

Create a `.env` file for Client (frontend)

```sh
API_URL=http://localhost:{PORT}/api/v1 # PORT = API_SERVER_PORT
```

## Install

```sh
pnpm install
pnpm build && pnpm start
```

or

```sh
npm install
npm run build && npm run start
```

## Usage (frontend)

And then navigate to the `http://localhost:{PORT}`

## Run tests

```sh
pnpm test
```

## Author

👤 **Ikram Ud Daula**

- Twitter: [@ikramhasib007](https://twitter.com/ikramhasib007)
- Github: [@ikramhasib007](https://github.com/ikramhasib007)
- LinkedIn: [@ikramhasib007](https://linkedin.com/in/ikramhasib007)
