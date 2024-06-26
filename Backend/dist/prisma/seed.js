"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var accountSeed_1 = require("../accountSeed");
var hasTagSeed_1 = require("../hasTagSeed");
var llmSeed_1 = require("../llmSeed");
var tagSeed_1 = require("../tagSeed");
var promptSeed_1 = require("../promptSeed");
var prisma_1 = require("../lib/prisma");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, accounts_1, account, _a, llms_1, llm, _b, tags_1, tag, _c, prompts_1, prompt, _d, hasTags_1, hasTag;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _i = 0, accounts_1 = accountSeed_1.accounts;
                    _e.label = 1;
                case 1:
                    if (!(_i < accounts_1.length)) return [3 /*break*/, 4];
                    account = accounts_1[_i];
                    return [4 /*yield*/, prisma_1.prisma.account.create({
                            data: account,
                        })];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = 0, llms_1 = llmSeed_1.llms;
                    _e.label = 5;
                case 5:
                    if (!(_a < llms_1.length)) return [3 /*break*/, 8];
                    llm = llms_1[_a];
                    return [4 /*yield*/, prisma_1.prisma.lLM.create({
                            data: llm,
                        })];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    _b = 0, tags_1 = tagSeed_1.tags;
                    _e.label = 9;
                case 9:
                    if (!(_b < tags_1.length)) return [3 /*break*/, 12];
                    tag = tags_1[_b];
                    return [4 /*yield*/, prisma_1.prisma.tag.create({
                            data: tag,
                        })];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    _c = 0, prompts_1 = promptSeed_1.prompts;
                    _e.label = 13;
                case 13:
                    if (!(_c < prompts_1.length)) return [3 /*break*/, 16];
                    prompt = prompts_1[_c];
                    return [4 /*yield*/, prisma_1.prisma.prompt.create({
                            data: prompt,
                        })];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15:
                    _c++;
                    return [3 /*break*/, 13];
                case 16:
                    _d = 0, hasTags_1 = hasTagSeed_1.hasTags;
                    _e.label = 17;
                case 17:
                    if (!(_d < hasTags_1.length)) return [3 /*break*/, 20];
                    hasTag = hasTags_1[_d];
                    return [4 /*yield*/, prisma_1.prisma.hasTag.create({
                            data: hasTag,
                        })];
                case 18:
                    _e.sent();
                    _e.label = 19;
                case 19:
                    _d++;
                    return [3 /*break*/, 17];
                case 20: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.log(e);
    process.exit(1);
})
    .finally(function () {
    prisma_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map