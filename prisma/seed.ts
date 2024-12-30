import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Permissions
  const permissions = [
    {
      action: 'user_view',
      entityType: 'User',
      description: 'Permission to view user profile',
    },
    {
      action: 'user_edit',
      entityType: 'User',
      description: 'Permission to edit user profile',
    },
    {
      action: 'property_view',
      entityType: 'Property',
      description: 'Permission to view property',
    },
    {
      action: 'property_edit',
      entityType: 'Property',
      description: 'Permission to edit property',
    },
    {
      action: 'property_upload_doc',
      entityType: 'Property',
      description: 'Permission to upload documents',
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        action_entityType: {
          action: permission.action,
          entityType: permission.entityType,
        },
      },
      update: {},
      create: permission,
    });
  }

  // Seed Roles
  const roles = [
    {
      name: 'Admin',
      description: 'Administrator with full access',
      permissions: [
        'user_view',
        'user_edit',
        'property_view',
        'property_edit',
        'property_upload_doc',
      ],
    },
    {
      name: 'Manager',
      description: 'Manager with limited access',
      permissions: [
        'user_view',
        'property_view',
        'property_edit',
        'property_upload_doc',
      ],
    },
    {
      name: 'Viewer',
      description: 'Viewer with read-only access',
      permissions: ['user_view', 'property_view'],
    },
  ];

  for (const role of roles) {
    const roleData = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });

    for (const action of role.permissions) {
      const permission = await prisma.permission.findUnique({
        where: {
          action_entityType: { action, entityType: action.split('_')[0] },
        },
      });

      if (permission) {
        await prisma.permissionRole.upsert({
          where: {
            roleId_permissionId: {
              roleId: roleData.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: roleData.id,
            permissionId: permission.id,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
