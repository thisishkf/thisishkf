$(document).ready(function () {
    var updateTs = function () {
        $('.flipClock').each(function () {
            let _this = $(this);
            let now = moment();
            let then = moment(_this.attr('data-ts'));
            let diff = moment.duration(then.diff(now));
            _this.find("#time-day").html(diff._data.months * 31 + diff._data.days);
            _this.find("#time-hours").html(diff._data.hours);
            _this.find("#time-mins").html(diff._data.minutes);
            _this.find("#time-sec").html(diff._data.seconds);
        });
    };

    setInterval(updateTs, 1000);
});