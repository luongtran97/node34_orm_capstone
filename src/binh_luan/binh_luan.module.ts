import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { BinhLuanController } from './binh_luan.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [BinhLuanController],
  providers: [BinhLuanService],
})
export class BinhLuanModule {}
