"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const webhook_1 = require("@slack/webhook");
const util_1 = require("util");
function run(url, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const webhook = new webhook_1.IncomingWebhook(url, {
                icon_emoji: ':bowtie:',
            });
            const response = yield webhook.send({
                text: message,
            });
            let stdResponse = false;
            if (response.text == '1' || response.text === 'ok')
                stdResponse = true;
            return stdResponse;
        }
        catch (error) {
            core.error(error);
            core.setFailed(error.message);
        }
    });
}
exports.run = run;
if (core.getInput('debug') === 'true')
    core.debug(util_1.inspect(github.context, { showHidden: false, depth: null }));
// if (github.context.payload){
//   run(
//     core.getInput('webhook'),
//     core.getInput('message')
//   )
// }
