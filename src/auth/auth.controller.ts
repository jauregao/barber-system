import {
	Controller,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { LocalAuthGuard } from './local-auth-guard'

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request, @Res() res: Response) {
		const { user } = req
		return res.status(HttpStatus.OK).json(user)
	}
}
