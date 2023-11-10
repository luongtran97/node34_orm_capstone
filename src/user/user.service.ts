import { Injectable, Res } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { decodeTokenType, userSignIn } from './entities/interface';
import { JwtService } from '@nestjs/jwt';
import { decoToken } from 'src/config/jwt';

// xử lý chức năng logic , crud
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  // upload avatar
  async uploadAvatar(file) {
    console.log("🚀 ~ file:", file)
    await this.prisma.hinh_anh.create;
    return 'update thành công!';
  }

  // đăng ký tài khoản
  async signUp(body: nguoi_dung, @Res() res) {
    let {
      taiKhoan,
      email,
      hoTen,
      tuoi,
      matKhau,
      anh_dai_dien,
      nguoi_dung_id,
      face_app_id,
    } = body;

    let checkEmail = await this.prisma.nguoi_dung.findMany({
      where: {
        email,
      },
    });

    if (checkEmail.length != 0) {
      res.status(400).send('email đã tồn tại');
      return;
    }

    // mã hóa password
    let newPassWord = bcrypt.hashSync(matKhau, 10);

    let newData: nguoi_dung = {
      taiKhoan,
      email,
      hoTen,
      tuoi,
      matKhau: newPassWord,
      anh_dai_dien,
      face_app_id,
      nguoi_dung_id,
    };

    await this.prisma.nguoi_dung.create({ data: newData });

    res.send('đăng ký thành công!');
  }

  // đăng nhập
  async signIn(body: userSignIn, @Res() res) {
    let { taiKhoan, matKhau } = body;

    let checkUser = await this.prisma.nguoi_dung.findFirst({
      where: { taiKhoan },
    });

    if (checkUser) {
      let checkPass = await bcrypt.compare(matKhau, checkUser.matKhau);

      if (checkPass) {
        // tạo token
        let token = this.jwtService.sign(
          { data: checkUser },
          { expiresIn: '5d', secret: 'BATMI' },
        );
        const decode: decodeTokenType = decoToken(token);
        const response = {
          token,
          anh_dai_dien: decode.data.anh_dai_dien,
          email: decode.data.email,
          hoTen: decode.data.hoTen,
          nguoi_dung_id: decode.data.nguoi_dung_id,
          taiKhoan: decode.data.taiKhoan,
        };
        res.send(response);
      } else {
        res.status(400).send('Mật khẩu không đúng');
      }
    } else {
      res.status(400).send('Tài khoản không đúng');
    }
  }

  // update thông tin cá nhân
  async updateInfo(body, res, token) {
    const { email, hoTen, matKhau, tuoi } = body;

    // decode token => id user

    let decode: decodeTokenType = decoToken(token.authorization);
    const { nguoi_dung_id } = decode.data;

    let user = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });

    let newPass = bcrypt.hashSync(matKhau, 10);
    let updateUser = { ...user, email, hoTen, matKhau: newPass, tuoi };

    await this.prisma.nguoi_dung.update({
      data: updateUser,
      where: { nguoi_dung_id },
    });
    res.send('Cập nhật thành công!');
  }

  // lấy thông tin cá nhân
  async getUser(token, res) {
    let decode: decodeTokenType = decoToken(token.authorization);
    const { nguoi_dung_id } = decode.data;

    let data = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });
    res.send(data);
  }
}
