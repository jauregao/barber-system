import {
	Controller,
	Get,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { LocalAuthGuard } from './guards/local-auth-guard'
import { TUser } from 'src/types/user'
import { JwtAuthGuard } from './guards/strategies/jwt-auth.guards'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request, @Res() res: Response) {
		const user = req.user as TUser
		const token = await this.authService.login(user)
		return res.status(HttpStatus.OK).json({
			id: user.id,
			name: user.name,
			token: token.access_token
		})
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Req() req: Request, @Res() res: Response) {
		const user = req.user as TUser

		return res.status(HttpStatus.OK).json({
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone
		})
	}
}
