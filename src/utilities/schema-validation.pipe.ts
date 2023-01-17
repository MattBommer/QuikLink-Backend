import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AuthResponseStatus, AuthResponseDto } from '../auth/auth.response.dto';
import { ObjectSchema } from 'joi'

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)

    if (error) {
      let response: AuthResponseDto = {status: AuthResponseStatus.FAILURE, message: error.message }
      throw new BadRequestException(response)
    }

    return value;
  }
}
