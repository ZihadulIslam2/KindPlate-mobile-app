import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config/app.config';

@Injectable()
export class CloudinaryService {
  constructor() {
    if (
      !config.cloudinary_cloud_name ||
      !config.cloudinary_api_key ||
      !config.cloudinary_api_secret
    ) {
      throw new Error(
        'Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env',
      );
    }

    cloudinary.config({
      cloud_name: config.cloudinary_cloud_name.trim(),
      api_key: config.cloudinary_api_key.trim(),
      api_secret: config.cloudinary_api_secret.trim(),
    });
  }

  async uploadImage(
    fileBuffer: Buffer,
    folder = 'business-gallery',
  ): Promise<{ url: string; publicId: string }> {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, uploaded) => {
          if (error) {
            const cloudinaryMessage =
              (error as { message?: string }).message ||
              'Unknown Cloudinary error';
            reject(new Error(`Cloudinary upload failed: ${cloudinaryMessage}`));
            return;
          }
          if (!uploaded) {
            reject(new Error('Cloudinary returned no upload result'));
            return;
          }
          resolve(uploaded);
        },
      );

      stream.end(fileBuffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }
}
