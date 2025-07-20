import sharp from 'sharp';

export const compressImage = async (
  file: File,
  quality: number = 90
): Promise<Buffer> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return await sharp(buffer).webp({ quality }).toBuffer();
};
