import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, binh_luan } from '@prisma/client';
import { decoToken } from 'src/config/jwt';
import { decodeTokenType } from 'src/user/entities/interface';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) {}
  // lấy bình luận theo thông id hình

  async getComment(idHinh, res) {
    let data: binh_luan[] = await this.prisma.binh_luan.findMany({
      where: {
        hinh_id: idHinh,
      },
    });
    res.send(data);
  }


  // gửi bình luận
  async postComment(token, res, body) {
    let decode: decodeTokenType = decoToken(token.authorization);

    const { nguoi_dung_id } = decode.data;

    const { hinh_id, noi_dung } = body;

    let data = {
      ngay_binh_luan: new Date(),
      nguoi_dung_id,
      hinh_id,
      noi_dung,
    };

    await this.prisma.binh_luan.create({ data: data });
    res.send('đã bình luận');
  }
}
