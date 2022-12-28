"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const common_1 = require("@nestjs/common");
const Verify = (verifyMethod) => (0, common_1.SetMetadata)('verify', verifyMethod);
exports.Verify = Verify;
//# sourceMappingURL=verify.decorator.js.map