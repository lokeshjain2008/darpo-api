import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}

  async createVisit(visitorId: string, propertyId: string, roomId: string, startDate: Date, endDate: Date) {
    // Mark the room as occupied
    await this.prisma.room.update({
      where: { id: roomId },
      data: { occupied: true },
    });

    return this.prisma.visit.create({
      data: {
        visitorId,
        propertyId,
        roomId,
        startDate,
        endDate,
      },
    });
  }

  async endVisit(visitId: string) {
    const visit = await this.prisma.visit.findUnique({
      where: { id: visitId },
    });

    if (visit) {
      // Mark the room as unoccupied
      await this.prisma.room.update({
        where: { id: visit.roomId },
        data: { occupied: false },
      });

      // Update the visit end date
      return this.prisma.visit.update({
        where: { id: visitId },
        data: { endDate: new Date() },
      });
    }

    throw new Error('Visit not found');
  }
}