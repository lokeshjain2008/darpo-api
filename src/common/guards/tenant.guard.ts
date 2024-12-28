// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';

// // don't add this guard to the providers array in the module
// // Not in use in this project, but it's a good example of how to use guards
// // @Injectable()
// export class TenantGuard implements CanActivate {
//   constructor(private prisma: PrismaService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const tenantId = request.headers['x-tenant-id'];

//     if (!tenantId) {
//       return false;
//     }

//     const tenant = await this.prisma.tenant.findUnique({
//       where: { id: tenantId },
//     });

//     if (!tenant) {
//       return false;
//     }

//     request.tenant = tenant;
//     return true;
//   }
// }