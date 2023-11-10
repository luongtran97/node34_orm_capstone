import { Injectable } from '@nestjs/common';
import { PrismaClient, hinh_anh, luu_anh } from '@prisma/client';
import { decoToken } from 'src/config/jwt';
import {
  decodeTokenType,
  hinh_id,
  luu_hinhApi,
} from 'src/user/entities/interface';

@Injectable()
export class ImgService {
  prisma = new PrismaClient();
  // lấy hình ảnh
  async getImg(): Promise<hinh_anh[]> {
    let data: hinh_anh[] = await this.prisma.hinh_anh.findMany();
    return data;
  }

  // lấy hình đã tạo theo id
  async getImgById(id, res) {


    let data: hinh_anh = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id:id,
      },
    });
    res.send(data);
  }

  // lấy hình đã lưu theo id
  async getSavedImgById(token, res) {
    let decode: decodeTokenType = decoToken(token.authorization);

    const { nguoi_dung_id } = decode.data;

    let data: luu_anh[] = await this.prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id,
      },
    });
    res.send(data);
  }

  // tìm kiếm hình theo tên
  async getImgByName(name: string, res) {
    let data: hinh_anh[] = await this.prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name,
        },
      },
    });
    res.send(data);
  }

  //  xóa ảnh theo id hình
  async delImgCreatedByIdImg(body, res) {
    const { hinh_id } = body;
    try {
      const existingImg: hinh_id = await this.prisma.hinh_anh.findUnique({
        where: {
          hinh_id,
        },
      });
      if (existingImg) {
        await this.prisma.hinh_anh.delete({
          where: {
            hinh_id,
          },
        });
        res.send('Xóa thành công!!');
      } else {
        res.status(404).send('Không tìm thấy hình');
      }
    } catch (error) {
      console.log('🚀 ~ error:', error);
      res.status(500).send(error);
    }
  }

  // lưu ảnh
  async saveImg(body, token,res) {

    const decode: decodeTokenType = decoToken(token.authorization);

    const {  hinh_id } = body;

    const { nguoi_dung_id } = decode.data;
    const newData = {
      nguoi_dung_id,
      hinh_id,
      ngay_luu: new Date(),
 
    };

    try {
       await this.prisma.luu_anh.create({ data: newData });
       res.send("Lưu hình thành công!")
    } catch (error) {
      res.send(error)
    }
  }

  // thêm hình
  async createImg(body, res) {
    try {
      await this.prisma.hinh_anh.create({ data: body });
      res.send('thêm hình thành công');
    } catch (error) {
      res.send(error);
    }
  }
}
