const color = {
	Black	: "\x1b[30m",
	Red		: "\x1b[31m",
	Green	: "\x1b[32m",
	Yellow	: "\x1b[33m",
	Blue	: "\x1b[34m",
	Magenta	: "\x1b[35m",
	Cyan	: "\x1b[36m",
	White	: "\x1b[37m"
}

const level = {
	ALL		: 70,
	TRACE	: 60,
	DEBUG	: 50,
	INFO	: 40,
	WARN	: 30,
	ERROR	: 20,
	FATAL	: 10,
	OFF		: 0
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

module.exports = {
	COLOR : color,
	LEVEL : level,
	DAYS  : days
}