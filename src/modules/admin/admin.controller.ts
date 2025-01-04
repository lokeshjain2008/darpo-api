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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('admin')
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Create organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createOrganization(
    @Body() data: { name: string; description?: string },
  ) {
    return this.organizationService.createOrganization(data);
  }

  @Get('organizations/:id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async getOrganizationById(@Param('id') id: string) {
    return this.organizationService.getOrganizationById(id);
  }

  @Put('organizations/:id')
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async updateOrganization(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string },
  ) {
    return this.organizationService.updateOrganization(id, data);
  }

  @Delete('organizations/:id')
  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async deleteOrganization(@Param('id') id: string) {
    return this.organizationService.deleteOrganization(id);
  }

  // User CRUD operations
  @Post('users')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // Property CRUD operations
  @Post('organizations/:organizationId/properties')
  @ApiOperation({ summary: 'Create property' })
  @ApiResponse({
    status: 201,
    description: 'The property has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createProperty(
    @Param('organizationId') organizationId: string,
    @Body() data: { name: string; description?: string; address: string },
  ) {
    return this.propertyService.createProperty({ ...data, organizationId });
  }

  @Get('properties/:id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({
    status: 200,
    description: 'The property has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async getPropertyById(@Param('id') id: string) {
    return this.propertyService.getPropertyById(id);
  }

  @Get('organizations/:organizationId/properties')
  @ApiOperation({ summary: 'Get properties by organization ID' })
  @ApiResponse({
    status: 200,
    description: 'The properties have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Properties not found.' })
  async getPropertiesByOrganizationId(
    @Param('organizationId') organizationId: string,
  ) {
    return this.propertyService.getPropertiesByOrganizationId(organizationId);
  }

  @Put('properties/:id')
  @ApiOperation({ summary: 'Update property' })
  @ApiResponse({
    status: 200,
    description: 'The property has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async updateProperty(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string; address?: string },
  ) {
    return this.propertyService.updateProperty(id, data);
  }

  @Delete('properties/:id')
  @ApiOperation({ summary: 'Delete property' })
  @ApiResponse({
    status: 200,
    description: 'The property has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async deleteProperty(@Param('id') id: string) {
    return this.propertyService.deleteProperty(id);
  }

  // Room CRUD operations
  @Post('properties/:propertyId/rooms')
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createRoom(
    @Param('propertyId') propertyId: string,
    @Body() data: { name: string; type: string; floor?: number },
  ) {
    return this.roomService.createRoom({ ...data, propertyId });
  }

  @Get('rooms/:id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({
    status: 200,
    description: 'The room has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Get('properties/:propertyId/rooms')
  @ApiOperation({ summary: 'Get rooms by property ID' })
  @ApiResponse({
    status: 200,
    description: 'The rooms have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Rooms not found.' })
  async getRoomsByPropertyId(@Param('propertyId') propertyId: string) {
    return this.roomService.getRoomsByPropertyId(propertyId);
  }

  @Put('rooms/:id')
  @ApiOperation({ summary: 'Update room' })
  @ApiResponse({
    status: 200,
    description: 'The room has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async updateRoom(
    @Param('id') id: string,
    @Body() data: { name?: string; type?: string; floor?: number },
  ) {
    return this.roomService.updateRoom(id, data);
  }

  @Delete('rooms/:id')
  @ApiOperation({ summary: 'Delete room' })
  @ApiResponse({
    status: 200,
    description: 'The room has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }
}
