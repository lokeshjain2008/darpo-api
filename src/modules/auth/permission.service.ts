import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async getUserPermissions(
    userId: string,
    propertyId?: string,
    organizationId?: string,
  ): Promise<string[]> {
    let userPermissions = [];

    if (propertyId) {
      const userRoles = await this.prisma.userPropertyRole.findMany({
        where: { userId, propertyId },
        include: { role: { include: { permissions: true } } },
      });

      const userPermissionsIds = userRoles.flatMap((userRole) =>
        userRole.role.permissions.map((permission) => permission.id),
      );

      const userPermissionObjects = await this.prisma.permission.findMany({
        where: { id: { in: userPermissionsIds } },
        select: { action: true },
      });

      userPermissions = userPermissionObjects.map(
        (permission) => permission.action,
      );
    }

    if (organizationId) {
      const orgRoles = await this.prisma.userOrganizationRole.findMany({
        where: { userId, organizationId },
        include: { role: { include: { permissions: true } } },
      });

      const orgRolesPermissionIds = orgRoles.flatMap((orgRole) =>
        orgRole.role.permissions.map((permission) => permission.id),
      );
      const orgPermissionObjects = await this.prisma.permission.findMany({
        where: { id: { in: orgRolesPermissionIds } },
        select: { action: true },
      });
      // concat the orgnization level permissions to the userPermissions array
      userPermissions = userPermissions.concat(
        orgPermissionObjects.map((permission) => permission.action),
      );
    }

    const appRoles = await this.prisma.userAppRole.findMany({
      where: { userId },
      include: { role: { include: { permissions: true } } },
    });

    const appRolesPermissionIds = appRoles.flatMap((appRole) =>
      appRole.role.permissions.map((permission) => permission.id),
    );

    const appPermissionObjects = await this.prisma.permission.findMany({
      where: { id: { in: appRolesPermissionIds } },
      select: { action: true },
    });

    // concat the app level permissions to the userPermissions array
    userPermissions = userPermissions.concat(
      appPermissionObjects.map((permission) => permission.action),
    );

    return userPermissions;
  }
}
