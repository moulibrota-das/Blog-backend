const cluster = require("node:cluster")
const os = require("os")

if(cluster.isPrimary){
  const cpus = os.cpus().length;
  for(let i=0; i<cpus; i++){
    cluster.fork();
  }
}
else{
  require("./index")
}