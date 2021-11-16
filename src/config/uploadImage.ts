import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

function pStart(num: number) {
  return num.toString().padStart(2, '0');
}

export const uploadImage = diskStorage({
  filename: function (_, file, cb) {
    const ext = file.originalname.split('.').pop();

    const date = new Date();

    const fileName = `IMG_${date.getFullYear().toString()}${pStart(
      date.getMonth() + 1,
    )}${pStart(date.getDate())}_${pStart(date.getHours())}${pStart(
      date.getMinutes(),
    )}${pStart(date.getSeconds())}_${Math.ceil(
      Math.random() * 10000,
    ).toString()}.${ext}`;

    cb(null, fileName);
  },
  destination: './uploads',
});

export const imageFilter = (
  _: any,
  file: Omit<Express.Multer.File, 'stream'>,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
    (acceptedFormat) => acceptedFormat === file.mimetype,
  );

  if (!isAccepted) {
    return cb(new BadRequestException('Tipo de arquivo não suportado!'), false);
  }

  return cb(null, true);
};
