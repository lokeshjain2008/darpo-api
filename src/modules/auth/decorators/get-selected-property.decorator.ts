import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Usage of the decorator:
 * @Controller('user')
 * export class UserController {
 *   @Get('profile')
 *   getProfile(@Req() req, @GetSelectedProperty() selectedProperty: string) {
 *     return { user: req.user, selectedProperty };
 *   }
 * }
 */

export const GetSelectedProperty = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.selectedProperty;
  },
);
