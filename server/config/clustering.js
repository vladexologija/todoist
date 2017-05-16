var cluster = require('cluster');

module.exports = function(logger) {
  logger.notice("Starting app in clustered mode");

  var numCPUs  = require('os').cpus().length;
  var timeouts = [];

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', function forkingWorker(worker) {
    logger.debug('Forking worker #' + worker.id);
    timeouts[worker.id] = setTimeout(function workerTimingOut() {
      logger.error(['Worker taking too long to start']);
    }, 2000);
  });

  cluster.on('listening', function onClusterListening(worker, address) {
    logger.notice('Worker #' + worker.id + ' listening on port: ' + address.port);
    clearTimeout(timeouts[worker.id]);
  });

  cluster.on('online', function onClusterOnline(worker) {
    logger.debug('Worker #'+worker.id+' is online');
  });

  cluster.on('exit', function onClusterExit(worker, code, signal) {
    logger.error(['The worker #'+worker.id+' has exited with exitCode ' + worker.process.exitCode]);
    clearTimeout(timeouts[worker.id]);
    // Don't try to restart the workers when disconnect or destroy has been called
    if(worker.suicide !== true) {
      logger.warning('Worker #' + worker.id + ' did not commit suicide, restarting');
      cluster.fork();
    }
  });

  cluster.on('disconnect', function onClusterDisconnect(worker) {
    logger.warning('The worker #' + worker.id + ' has disconnected');
  });

  // Trick suggested by Ian Young (https://github.com/isaacs/node-supervisor/issues/40#issuecomment-4330946)
  // to make cluster and supervisor play nicely together:
  if (process.env.NODE_HOT_RELOAD == 1) {
    var signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    signals.forEach( function forEachQuitSignal(signal){
      process.on(signal, function onQuitSignals(){
        cluster.workers.forEach( function destroyWorker(worker){
          worker.destroy();
        });
      });
    });
  }
};
