import { SetMetadata } from "@nestjs/common";

export const Verify = (verifyMethod: string) => SetMetadata('verify', verifyMethod)