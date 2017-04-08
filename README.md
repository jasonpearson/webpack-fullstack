# webpack-fullstack
This package provides a simple CLI that is ideal for building apps that use Webpack to compile both server-side code and client code. There are two primary reasons to use this package, it will allow you to:
1. automatically start and restart a node child process for your server each time changes are made to the server-side source code (instead of using something like nodemon).
2. consolidate both Webpack configurations (client and server) into a single file that provides sensible defaults with the ability to provide overrides.

### quickstart
1. `npm install webpack-fullstack -g`
2. create webpack-fullstack.config.js
3. CLI: `webpack-fullstack`
	- outputs built file for server code
	- outputs built file for client code
4. CLI: `webpack-fullstack-dev-server`  
	- builds server code in-memory, watches for changes, and starts/restarts a node process when source server code changes
	- builds client code in-memory and rebuilds client code
5. CLI: `webpack-fullstack-dev-server --output-client`
	- builds server code in-memory, watches for changes, and starts/restarts a node process when source server code changes
	- outputs a built file for client CONFIG (not code) so that it can be consumed in a custom way (i.e. webpack-hot-middleware)

### 1. install global or local
  // TO-DO

### 2. create webpack-fullstack.config.js
  // TO-DO

### 3. CLI: webpack-fullstack-dev-server
  // TO-DO

### 4. CLI: webpack-fullstack-dev-server —-output-client
Using this option will build the client config inside your local node_modules/webpack-fullstack directory. You can import and consume it by `import config from webpack-fullstack`.