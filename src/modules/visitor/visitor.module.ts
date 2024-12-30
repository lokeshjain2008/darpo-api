import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [VisitorService],
})
export class VisitorModule {}
