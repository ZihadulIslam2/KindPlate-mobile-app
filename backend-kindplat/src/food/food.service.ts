/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodPost } from '../database/schemas';
import { CreateFoodDto } from './dto/create-food.dto';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { CustomLoggerService } from '../common/services/custom-logger.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(FoodPost.name) private readonly foodModel: Model<FoodPost>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly customLogger: CustomLoggerService,
  ) {}

  async create(dto: CreateFoodDto, image?: Express.Multer.File) {
    this.customLogger.log('Creating food post', 'FoodService');

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(
        image.buffer,
        'food-posts',
      );
      imageUrl = uploadedImage.url;
      imagePublicId = uploadedImage.publicId;
    }

    const createdFood = new this.foodModel({
      ...dto,
      expiryTime: new Date(dto.expiryTime),
      imageUrl,
      imagePublicId,
      distanceKm: dto.distanceKm ?? this.generateApproxDistance(),
    });

    const saved = await createdFood.save();
    return this.toResponse(saved);
  }

  async findAll() {
    const items = await this.foodModel
      .find()
      .sort({ createdAt: -1 })
      .limit(50)
      .exec();

    return items.map((item) => this.toResponse(item));
  }

  private toResponse(item: FoodPost) {
    return {
      id: item._id.toString(),
      plateTitle: item.plateTitle,
      foodType: item.foodType,
      quantity: item.quantity,
      weight: item.weight,
      expiryTime: item.expiryTime,
      address: item.address,
      imageUrl: item.imageUrl,
      distanceKm: item.distanceKm,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  private generateApproxDistance() {
    const min = 0.5;
    const max = 5;
    return Number((Math.random() * (max - min) + min).toFixed(1));
  }
}
