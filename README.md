<p align="center">
<img src="https://user-images.githubusercontent.com/14835725/43674196-6f593114-97ed-11e8-80c1-d054391062d6.png" alt="node-reel logo">
</p>

**`node-reel`** is a heavily inspired by laravel task scheduler syntax thanks to [@taylorotwell](https://github.com/taylorotwell) and uses [`node-cron`](https://github.com/merencia/node-cron) by [merencia](https://github.com/merencia) as the default cron driver to run cron tasks.

## Notice:
This project forked from https://github.com/shakee93/node-reel

### v2.0.1 Change log:

 - update "node-cron" to: "^3.0.0"
 - fix a warning: (node:23300) [DEP0128] DeprecationWarning: Invalid 'main' field in '\node_modules\node-reel\package.json' of 'src/index.js'. Please either fix that or report
it to the module author
 - add some test for main functions
 - adjust options when create the new object.
 - validate cron expressions when schedule job.

### why node-reel ? :wink:
```javascript
const reel = require('node-reel')

reel().call(() => {
	// say hello on mondays
}).weekly().mondays().at('13:00').run()

reel().command('npm run clean_trash').everyThirtyMinutes().run()

```

### Install
using the npm or yarn
```shell
npm i node-reel --save
```

### Schedule Frequencies
Method  | Description
------------- | -------------
`.cron('* * * * *');`  |  Run the task on a custom Cron schedule
`.everyMinute();`  |  Run the task every minute
`.everyFiveMinutes();`  |  Run the task every five minutes
`.everyTenMinutes();`  |  Run the task every ten minutes
`.everyFifteenMinutes();`  |  Run the task every fifteen minutes
`.everyThirtyMinutes();`  |  Run the task every thirty minutes
`.everyFortyFiveMinutes();`  |  Run the task every forty five minutes
`.hourly();`  |  Run the task every hour
`.hourlyAt(17);`  |  Run the task every hour at 17 mins past the hour
`.daily();`  |  Run the task every day at midnight
`.dailyAt('13:00');`  |  Run the task every day at 13:00
`.twiceDaily(1, 13);`  |  Run the task daily at 1:00 & 13:00
`.weekly();`  |  Run the task every week
`.weeklyOn(1, '8:00');`  |  Run the task every week on Tuesday at 8:00
`.monthly();`  |  Run the task every month
`.monthlyOn(4, '15:00');`  |  Run the task every month on the 4th at 15:00
`.quarterly();` |  Run the task every quarter
`.yearly();`  |  Run the task every year
`.weekdays();`  |  Limit the task to weekdays
`.sundays();`  |  Limit the task to Sunday
`.mondays();`  |  Limit the task to Monday
`.tuesdays();`  |  Limit the task to Tuesday
`.wednesdays();`  |  Limit the task to Wednesday
`.thursdays();`  |  Limit the task to Thursday
`.fridays();`  |  Limit the task to Friday
`.saturdays();`  |  Limit the task to Saturday

link to laravel task scheduler doc : [task scheduler](https://laravel.com/docs/5.6/scheduling)

### Methods
Method  | Description
------------- | -------------
`.call(function)`  |  pass a callback which will triggered
`.command(string/array);`  |  pass cli commands as string or array of strings
`.run();`  |  call this at the end of the chain to initiate.


### Adapters
`node-reel` will use `node-cron` as default adapter. but you can pass your own adapter and return your own object.

```javascript
const Reel = require('node-reel').Reel;

const reel = new Reel({
    adapter : (object) => {
    	// use your cron library or custom cron logic
    	// below are the available properties
    	let expression = object.expression;
    	let callback = object.callback;
    	let timezone = object.timezone;
    	
    	return mycron.schedule(expression, callback);
    }
})


// use it as follows
reel.command('npm run foo').hourly().run();
```

### Monitor the Scheduled Executions
If you want to keep an eye on every execution and make sure they succeed or fail, or even if they execute at all, or make a report of each, you can:

```javascript
reel().command('npm run clean_trash', (error) => {
    if (error) {
	// Handle the error
    } else {
	// Report the success
    }
}).everyThirtyMinutes().run()
```

### Notes
issues, pull request and feedback are welcome !
Happy Scheduling !!
