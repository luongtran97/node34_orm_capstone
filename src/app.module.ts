import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ImgModule } from './img/img.module';
import { BinhLuanModule } from './binh_luan/binh_luan.module';




@Module({
  imports: [UserModule, ImgModule, BinhLuanModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
