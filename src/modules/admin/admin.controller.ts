import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { RoomService } from './room.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
    private readonly propertyService: PropertyService,
    private readonly roomService: RoomService,
  ) {}

  // Organization CRUD operations
  @Post('organizations')
  async createOrganization(
    @Body() data: { name: string; description?: string },
  ) {
    return this.organizationService.createOrganization(data);
  }

  @Get('organizations/:id')
  async getOrganizationById(@Param('id') id: string) {
    return this.organizationService.getOrganizationById(id);
  }

  @Put('organizations/:id')
  async updateOrganization(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string },
  ) {
    return this.organizationService.updateOrganization(id, data);
  }

  @Delete('organizations/:id')
  async deleteOrganization(@Param('id') id: string) {
    return this.organizationService.deleteOrganization(id);
  }

  // User CRUD operations
  @Post('users')
  async createUser(
    @Body()
    data: {
      email: string;
      password: string;
      name: string;
      organizationId: string;
    },
  ) {
    return this.userService.createUser(data);
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: { email?: string; password?: string; name?: string },
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // Property CRUD operations
  @Post('organizations/:organizationId/properties')
  async createProperty(
    @Param('organizationId') organizationId: string,
    @Body() data: { name: string; description?: string; address: string },
  ) {
    return this.propertyService.createProperty({ ...data, organizationId });
  }

  @Get('properties/:id')
  async getPropertyById(@Param('id') id: string) {
    return this.propertyService.getPropertyById(id);
  }

  @Get('organizations/:organizationId/properties')
  async getPropertiesByOrganizationId(
    @Param('organizationId') organizationId: string,
  ) {
    return this.propertyService.getPropertiesByOrganizationId(organizationId);
  }

  @Put('properties/:id')
  async updateProperty(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string; address?: string },
  ) {
    return this.propertyService.updateProperty(id, data);
  }

  @Delete('properties/:id')
  async deleteProperty(@Param('id') id: string) {
    return this.propertyService.deleteProperty(id);
  }

  // Room CRUD operations
  @Post('properties/:propertyId/rooms')
  async createRoom(
    @Param('propertyId') propertyId: string,
    @Body() data: { name: string; type: string; floor?: number },
  ) {
    return this.roomService.createRoom({ ...data, propertyId });
  }

  @Get('rooms/:id')
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Get('properties/:propertyId/rooms')
  async getRoomsByPropertyId(@Param('propertyId') propertyId: string) {
    return this.roomService.getRoomsByPropertyId(propertyId);
  }

  @Put('rooms/:id')
  async updateRoom(
    @Param('id') id: string,
    @Body() data: { name?: string; type?: string; floor?: number },
  ) {
    return this.roomService.updateRoom(id, data);
  }

  @Delete('rooms/:id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
