import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/services/jwt.strategy.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtAuthProvider } from 'src/security/guards/jwt.auth.guard';
import { ResponseService } from 'src/services/response.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '8276f43a-21d1-4361-b18b-13be03f615ed',
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [
    AuthService,
    JwtStrategy, 
    JwtAuthProvider,
    ResponseService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
