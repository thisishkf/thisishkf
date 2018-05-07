const _boardcast = function (io, channel , message) {
	io.emit(channel, message);
};

module.exports = {
	boardcast : _boardcast
}