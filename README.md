Chatty
=====================

Chatty is primarily a client-side SPA built with ReactJS. It allows users to communicate with each other without having to register accounts. It communicates with a server via WebSockets for multi-user real-time updates.

### Final Product

#### Adding Multiple Users & changing username
!["changing-current-username"](/public/screenshots/changing-current-username.gif)

#### Disconnecting from chat
!["disconnecting-user"](/public/screenshots/disconnecting-user.gif)

### Usage

Clone the git repo.

```
git clone git@github.com:nikijiandani/chatty-app.git 
cd chatty-app
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
*Note: You will also have to clone the [Chatty websocket server git repo](https://github.com/nikijiandani/chatty-server).*

```
git clone git@github.com:nikijiandani/chatty-server.git
cd chatty-server
```

Install the dependencies for chatty-server and start the server.

```
npm install
npm start
```

### [Chatty Server](https://github.com/nikijiandani/chatty-server)

The Chatty WebSocket server will run in parallel (on port 3001) along with the Chatty App webpack dev server that runs (on port 3000).

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* [Chatty_server](https://github.com/nikijiandani/chatty-server)
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
