import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  title: string;

  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  description: string;

  @IsDateString({}, { message: 'Tanggal harus berformat date yang valid' })
  @IsNotEmpty({ message: 'Tanggal tidak boleh kosong' })
  date: string;

  @IsNotEmpty({ message: 'Lokasi tidak boleh kosong' })
  location: string;
}
