import * as core from '@actions/core'
import * as github from '@actions/github';
import { SlackClient } from './slack'

async function run() {
  try {
    const prNumber = getPrNumber()

    const run = new Runner(
      core.getInput('platform'),
      `core.getInput('message') ${prNumber}`,
      core.getInput('webhook')
    )

    run.sendToSlack()

  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function getPrNumber(): number | boolean {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return false;
  }
  return pullRequest.number;
}

export class Runner {
  private readonly notifyPlatform: string
  private readonly notifyMessage: string
  private readonly notifyWebhook: string

  public constructor(platform, message, token) {
    this.notifyPlatform = platform
    this.notifyMessage = message
    this.notifyWebhook = token
  }

  public async basic() {
    try {
      const output = `Hello ${this.notifyPlatform}`
      return output
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  public async message() {
    try {
      const output = `${this.notifyMessage}`
      return output
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  public async sendToSlack() {
    const slackWeb = new SlackClient(this.notifyMessage,this.notifyWebhook)
    const result = await slackWeb.sendMessage()
    console.log(result)
    console.log(`Sent message to ${this.notifyPlatform}`);
    return result
  }

}
