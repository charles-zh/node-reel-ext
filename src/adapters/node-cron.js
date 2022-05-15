const cron = require('node-cron');

module.exports = function (data) {
    const check = cron.validate(data.expression);
    if (!check) {
        // set error state and know it immediately
        console.log('node-reel: bad cron expression.');
        return null;
    }
    return cron.schedule(data.expression, data.callback, {
        scheduled: data.scheduled,
        timezone: data.timezone
    });
}