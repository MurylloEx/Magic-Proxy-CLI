import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/services/jwt.strategy.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtAuthProvider } from 'src/security/guards/jwt.auth.guard';
import { AuthorizeProvider } from 'src/security/guards/authorize.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '<secret-key-here>',
      signOptions: { expiresIn: '86400s' },
    })
  ],
  providers: [
    AuthService,
    JwtStrategy, 
    // AuthorizeProvider,
    JwtAuthProvider
  ],
  controllers: [AuthController]
})
export class AuthModule {}
