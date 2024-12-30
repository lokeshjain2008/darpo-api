import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    const selectedProperty = user.selectedProperty;
    if (!selectedProperty) {
      throw new ForbiddenException('No property selected');
    }

    const userRoles = await this.prisma.userPropertyRole.findMany({
      where: { userId: user.userId, propertyId: selectedProperty },
      include: { role: { include: { permissions: true } } },
    });

    const userPermissions = userRoles.flatMap((userRole) =>
      userRole.role.permissions.map((permission) => permission.action),
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'User does not have the required permissions',
      );
    }

    return true;
  }
}
