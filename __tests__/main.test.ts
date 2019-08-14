import { Runner }  from '../src/main'

describe('Basic Tests', () => {
  it('Responds with Hello {platform}', async () => {
    const platformName = 'Slack'
    const message = ''
    const webhook = ''
    const runner: Runner = new Runner(platformName, message, webhook)
    expect(await runner.basic()).toEqual(`Hello ${platformName}`)
  });

  it('Responds with message', async () => {
    const platformName = 'Slack'
    const message = 'This pull request is approved and ready to merge: '
    const webhook = ''
    const runner: Runner = new Runner(platformName, message, webhook)
    expect(await runner.message()).toEqual(message)
  });

  it('Sends aa message to Slack', async () => {
    const platformName = 'Slack'
    const message = 'This pull request is approved and ready to merge: '
    const webhook = process.env['SLACK_WEBHOOK']
    const runner: Runner = new Runner(platformName, message, webhook)
    expect(await runner.sendToSlack()).toEqual('ok')
  });

});
