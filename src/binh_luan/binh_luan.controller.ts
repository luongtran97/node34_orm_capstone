import { Controller, Get, Body, HttpCode, Param, Post, Res, Headers } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { ApiTags } from '@nestjs/swagger';
import { commentType } from './interface';

@ApiTags('comment')
@Controller('comment')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  // lấy bình luận theo thông id hình
  @Get('/getcomment-byid/:idHinh')
  getComment(@Param('idHinh') idHinh: number, @Res() res) {
    return this.binhLuanService.getComment(+idHinh, res);
  }

  // bình luận
  @Post('/post-comment')
  @HttpCode(201)
  postComment(
    @Body() body:commentType,
    @Headers() token:string,
    @Res() res,
  ) {
    return this.binhLuanService.postComment(token, res, body);
  }
}
