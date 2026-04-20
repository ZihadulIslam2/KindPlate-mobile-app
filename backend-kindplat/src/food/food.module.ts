import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { FoodPost, FoodPostSchema } from '../database/schemas';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: FoodPost.name, schema: FoodPostSchema },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
