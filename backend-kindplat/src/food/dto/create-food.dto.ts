import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @MaxLength(120)
  plateTitle: string;

  @IsString()
  @MaxLength(80)
  foodType: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  quantity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  weight?: string;

  @IsDateString()
  expiryTime: string;

  @IsString()
  @MaxLength(220)
  address: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    return Number(value);
  })
  @IsNumber()
  @Min(0)
  distanceKm?: number;
}
