const ReelFrequencies = require('./frequencies')
const adapter = require('./adapters/node-cron');

class Reel extends ReelFrequencies {

	constructor(options = {}) {

		super();

		this.expression = "* * * * *";
		this.adapter = options.adapter || null;
		this.callback = options.callback || null;
		this.scheduled = options.scheduled || true;
		this.timezone = options.timezone || '';
	}

	timezone(timezone) {
		this.timezone = timezone;
		return this;
	}

	call(callback) {
		this.callback = callback;
		return this;
	}

	cron(expression) {
		this.expression = expression;
		return this;
	}

	command(commands, callback) {
		const shell = require('./child_process');

		this.callback = () => {

			if (Array.isArray(commands)) {
				shell.series(commands, callback);
				return;
			}

			shell.exec(commands, callback)

		};

		return this;
	}

	run() {

		let data = {
			expression: this.expression,
			callback: this.callback,
			timezone: this.timezone,
			scheduled: this.scheduled
		};

		if(this.adapter) {
			return this.adapter(data)
		}

		return adapter(data);
	}
}

module.exports = Reel;