import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async createRoom(data: { name: string; type: string; floor?: number; propertyId: string }): Promise<Room> {
    return this.prisma.room.create({
      data,
    });
  }

  async getRoomById(id: string): Promise<Room> {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  async getRoomsByPropertyId(propertyId: string): Promise<Room[]> {
    return this.prisma.room.findMany({
      where: { propertyId },
    });
  }

  async updateRoom(id: string, data: { name?: string; type?: string; floor?: number }): Promise<Room> {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }

  async deleteRoom(id: string): Promise<Room> {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}