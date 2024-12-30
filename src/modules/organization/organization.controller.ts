import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organization.dto';

@ApiTags('organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
  @ApiOperation({ summary: 'Create new organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created successfully'
  })
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    // Implementation
  }

  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'List of organizations'
  })
  @Get()
  findAll() {
    // Implementation
  }

  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization details'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Implementation
  }

  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization updated successfully'
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    // Implementation
  }

  @ApiOperation({ summary: 'Delete organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization deleted successfully'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    // Implementation
  }
}