import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { isUniqueConstraintViolation } from 'src/shared/helper/exception';
import { DuplicateEntryError } from 'src/shared/helper/error';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async createNewUser(@Body() user: UserDTO) {
    try {
      const newUser = await this.userService.createUser(user);
      return newUser;
    } catch (e: unknown) {
      this.logger.error({ e });
      if (isUniqueConstraintViolation(e)) {
        throw new DuplicateEntryError(
          e.sqlMessage ?? 'Unique constraint violated',
        );
      }
    }
  }
}
