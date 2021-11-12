import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '~/app/address/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
})
export class AddressModule {}
