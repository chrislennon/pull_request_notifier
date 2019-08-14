import { run }  from '../src/main'

describe('Basic Tests', () => {

  it('Sends a message to Slack', async () => {
    const message = 'Successful test message '
    const url = process.env['WEBHOOK_URL']
    const runner = await run(url, message)
    expect(runner).toEqual(true)
  });

});
