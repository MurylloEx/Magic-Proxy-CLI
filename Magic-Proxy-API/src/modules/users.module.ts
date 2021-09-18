import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UsersService } from 'src/services/users.service';
import { UsersController } from 'src/controllers/users.controller';
import { ResponseService } from 'src/services/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService, ResponseService],
  exports: [UsersService]
})
export class UsersModule {}
