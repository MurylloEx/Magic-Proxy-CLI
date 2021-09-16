import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/services/jwt.strategy.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtAuthProvider } from 'src/security/guards/jwt.auth.guard';
import { MagicProxyModule } from './magic.proxy.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '<secret-key-here>',
      signOptions: { expiresIn: '86400s' },
    }),
    MagicProxyModule
  ],
  providers: [
    AuthService,
    JwtStrategy, 
    JwtAuthProvider
  ],
  controllers: [AuthController]
})
export class AuthModule {}
