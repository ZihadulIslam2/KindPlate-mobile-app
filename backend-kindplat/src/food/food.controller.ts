import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiOperation({ summary: 'Create a new food sharing post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Food post fields and optional image file',
    schema: {
      type: 'object',
      required: ['plateTitle', 'foodType', 'expiryTime', 'address'],
      properties: {
        plateTitle: { type: 'string' },
        foodType: { type: 'string' },
        quantity: { type: 'string' },
        weight: { type: 'string' },
        expiryTime: { type: 'string', format: 'date-time' },
        address: { type: 'string' },
        distanceKm: { type: 'number' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 8 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only image files are allowed'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.foodService.create(createFoodDto, image);
  }

  @ApiOperation({ summary: 'Get nearby/shared food posts' })
  @Get()
  findAll() {
    return this.foodService.findAll();
  }
}
