import {
  Controller,
  Post,
  UploadedFile,
  Res,
  UseInterceptors,
  Body,
  HttpCode,
  Put,
  Get,
  Headers,
} from '@nestjs/common';
// import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { nguoi_dung } from '@prisma/client';
import { userSignIn, userUpdateInfo } from './entities/interface';
import { UserService } from './user.service';

// router
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // api đăng ký tài khoản
  @Post('/sign-up')
  @HttpCode(201)
  signUp(@Body() body: nguoi_dung, @Res() res) {
    return this.userService.signUp(body, res);
  }

  // api lấy thông tin user
  @Get('/get-user')
  getUser(@Headers() token: string, @Res() res) {
    return this.userService.getUser(token, res);
  }

  //api đăng nhập
  @Post('/sign-in')
  @HttpCode(200)
  signIn(@Body() body: userSignIn, @Res() res) {
    return this.userService.signIn(body, res);
  }

  // api update thông tin cá nhân
  @Put('/user-updateInfo')
  @HttpCode(200)
  updateInfo(
    @Body() body: userUpdateInfo,
    @Res() res,
    @Headers() token: string,
  ) {
    return this.userService.updateInfo(body, res, token);
  }

  // api upload avatar user
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + '_' + file.originalname);
        },
      }),
    }),
  )
  @Post('/upload-avatar')
  @HttpCode(200)
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }
}
