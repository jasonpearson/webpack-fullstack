const {NodeVM} = require('vm2');

console.log('NEW VM');

const vm = new NodeVM({
  require: {
    external: true,
    builtin: ['fs', 'path']
  }
});

vm.run(process.argv[2], process.argv[3]);

// console.log(process.argv[3])

// './src/server/server.bundle.ts'
