import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Cat, CatSchema } from '../../schema/cat.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
