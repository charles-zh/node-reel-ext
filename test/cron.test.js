const reel = require('../index');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// adjust timeout
jest.setTimeout(100000);

test('node-reel test bad cron settings', async () => {
  const cron = reel().cron('1/11 * * * * *').command('ls').run();
  expect(cron).toBe(null);
});

test('node-reel cron test every second', async () => {
  const cron = reel().cron('*/1 * * * * *');
  const ctrl = cron.call(() => {
    console.log('test running every second');
    expect(true);
  }).run();
  await sleep(2000).then(() => {
    console.log('test cron end');
    ctrl.stop();
  });
});

test('node-reel cron test command every second', async () => {
  const ctrl = reel().cron('*/1 * * * * *').command('npm version').run();
  await sleep(2000).then(() => {
    console.log('test command end');
    ctrl.stop();
  });
});

test('node-reel cron start function', async () => {

  const ctrl = reel({
    scheduled: false
  }).cron('*/1 * * * * *').command('npm help').run();
  ctrl.start();

  await sleep(2000).then(() => {
    console.log('test command end');
    ctrl.stop();
  });
});
