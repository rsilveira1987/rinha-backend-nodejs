// import cluster from "cluster";
// import os from "os";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const cpuCount = os.cpus().length;

// console.log(`The total number of CPUs is ${cpuCount}`);
// console.log(`Primary pid=${process.pid}`);
// cluster.setupPrimary({
//   exec: __dirname + "/server.js",
// });

// for (let i = 0; i < cpuCount; i++) {
//     cluster.fork();
// }

// cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} has been killed`);
//     console.log("Starting another worker");
//     cluster.fork();
// });
const cluster = require('cluster');
const cpus = require('os').cpus();

let popped1 = cpus.pop();
let popped2 = cpus.pop();

if (cluster.isMaster) {
    
    cpus.forEach( () => cluster.fork() );
    
    cluster.on('listening', (worker) => {
        console.log(`Cluster ${worker.process.pid} conectado.`);
    });

    cluster.on('disconnect', (worker) => {
        console.log(`Cluster ${worker.process.pid} desconectado.`);
    });

    cluster.on('exit', (worker) => {
        console.log(`Cluster ${worker.process.pid} finalizado.`);
    });
} else {
    require('./server.js');
}
