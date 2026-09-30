import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'Nama pemesan tidak boleh kosong' })
  ordererName: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email pemesan tidak boleh kosong' })
  ordererEmail: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'eventId harus berupa angka' })
  eventId: number;
}
