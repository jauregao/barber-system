import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersService } from 'src/users/users.service'
import { LocalStrategy } from './local.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
	imports: [PassportModule],
	controllers: [AuthController],
	providers: [AuthService, UsersService, LocalStrategy]
})
export class AuthModule {}
