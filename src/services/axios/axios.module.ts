import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { AxiosService } from './axios.service';


@Module({
  imports: [LoggerModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule { }
