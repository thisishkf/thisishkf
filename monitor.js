const child_process = require('child_process');
const config = require(__dirname + '/config').process;
const Logger = require(__dirname + '/lib/Logger');
var count = 0;

const restart = function () {
	Logger.info(`process restarting on ${count} time(s).`);
	start(config.rootjs);
};

const start = function (nodefile) {
	Logger.info('Master process is running.');

	var proc = child_process.spawn('node', [nodefile]);
	proc.stdout.on('data', function (data) {
		console.log(data.toString());
	});

	proc.stderr.on('data', function (data) {
		console.log(data.toString());
	});

	proc.on('exit', function (code) {
		Logger.info('child process exited with code ' + code);
		delete (proc);
		if (++count <= config.max_restart) {
			setTimeout(restart, config.timeout);
		} else {
			Logger.info("Reaching maximum restart count, please contact system admin.");
			process.exit(0);
		}
	});
};

start(config.rootjs);