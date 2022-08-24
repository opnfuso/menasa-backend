import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketValidationPipe implements PipeTransform<any> {
  constructor() {
    // super(options)
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    let object = {};

    if (typeof value === 'string') {
      object = plainToClass(metatype, JSON.parse(value));
    } else {
      object = plainToClass(metatype, value);
    }

    const errors = await validate(object);
    const error = {
      status: 'Bad Request',
      statusCode: 401,
      errors: errors,
    };

    if (errors.length > 0) {
      throw new WsException(errors); //new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
