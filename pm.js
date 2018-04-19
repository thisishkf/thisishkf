const child_process = require('child_process');
const config = require('./config').process;

var count = 0;

const restart = function () {
	console.log(`process restarting on ${count} time(s).`);
	start(config.rootjs);
};

const start = function (nodefile) {
	console.log('Master process is running.');

	var proc = child_process.spawn('node', [nodefile]);
	proc.stdout.on('data', function (data) {
		console.log(data.toString());
	});

	proc.stderr.on('data', function (data) {
		console.log(data.toString());
	});

	proc.on('exit', function (code) {
		console.log('child process exited with code ' + code);
		delete(proc);
		if (++count <= config.max_restart) {
			setTimeout(restart, config.timeout);
		} else {
			console.log("Reaching maximum restart count, please contact system admin.");
			process.exit(0);
		}
	});
};

start(config.rootjs);
