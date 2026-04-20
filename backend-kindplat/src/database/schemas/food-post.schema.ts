import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'food_posts', timestamps: true })
export class FoodPost extends Document {
  @Prop({ required: true, trim: true })
  plateTitle: string;

  @Prop({ required: true, trim: true })
  foodType: string;

  @Prop({ trim: true })
  quantity?: string;

  @Prop({ trim: true })
  weight?: string;

  @Prop({ required: true })
  expiryTime: Date;

  @Prop({ required: true, trim: true })
  address: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  imagePublicId?: string;

  @Prop({ type: Number, min: 0, default: 1.5 })
  distanceKm: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const FoodPostSchema = SchemaFactory.createForClass(FoodPost);
FoodPostSchema.index({ createdAt: -1 });
FoodPostSchema.index({ expiryTime: 1 });
