import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { hinh_anh, luu_anh } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { hinh_id, luu_hinhApi, tao_hinhApi } from 'src/user/entities/interface';

@ApiTags('img')
@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  // api lấy hình ảnh
  @Get('/getAllImg')
  @HttpCode(200)
  getAllImg(): Promise<hinh_anh[]> {
    return this.imgService.getImg();
  }

  // api lấy hình ảnh đã tạo theo id hình
  @Get('/getImgById/:id')
  @HttpCode(200)
  getImgById( @Param('id') id:number ,@Res() res) {
    return this.imgService.getImgById(+id, res);
  }

  // api lấy hình ảnh đã lưu theo id_nguoi_dung
  @Get('/getSavedImgById')
  @HttpCode(200)
  getSavedImgById(@Headers() token: string, @Res() res) {
    return this.imgService.getSavedImgById(token, res);
  }

  // api tìm kiếm theo tên hình ảnh
  @Get('/getImgByName/:name')
  @HttpCode(200)
  getImgByName(@Param('name') name: string, @Res() res) {
    return this.imgService.getImgByName(name, res);
  }

  // khóa api
  // api xóa ảnh theo id
  @Delete('/delImgCreated')
  @HttpCode(200)
  delImgCreatedByIdImg(@Body() body: hinh_id, @Res() res) {
    return this.imgService.delImgCreatedByIdImg(body, res);
  }

  // api lưu ảnh
  @Post('/saveImg')
  @HttpCode(201)
  saveImg(@Headers() token: string, @Body() body, @Res() res) {
    return this.imgService.saveImg(body, token, res);
  }

  // api tạo ảnh
  @Post('createImg')
  @HttpCode(201)
  createImg(@Body() body: tao_hinhApi, @Res() res) {
    return this.imgService.createImg(body, res);
  }
}
