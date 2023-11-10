export type userSignIn = {
  taiKhoan: string;
  matKhau: string;
};

export type userUpdateInfo = {
  hoTen: string;
  tuoi: number;
  matKhau: string;
  email: string;
};
export type decodeTokenType =  {
  data: {
    nguoi_dung_id: number;
    taiKhoan: string;
    email: string;
    matKhau: string;
    hoTen: string;
    tuoi: number;
    anh_dai_dien: string;
    face_app_id: string;
  };
  iat: number;
  exp: number;
};

export type hinh_id= {
  hinh_id:number
};

export type luu_hinhApi={
  nguoi_dung_id:number,
  hinh_id:number,
  ngay_luu:Date,
  tinh_trang:boolean
}
export type tao_hinhApi ={
  ten_hinh:string,
  duong_dan:string,
  mo_ta:string,
  nguoi_dung_id:number
}