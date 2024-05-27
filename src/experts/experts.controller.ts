import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Res
} from '@nestjs/common'
import { Response } from 'express'
import { ExpertsService } from './experts.service'
import CreateExpertDto from './dtos/create-experts'

@Controller('experts')
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@Post()
	async create(@Body() data: CreateExpertDto, @Res() res: Response) {
		const expertExistis = await this.expertsService.findExpertByEmail(
			data.email
		)
		if (expertExistis) {
			throw new BadRequestException('Já existe um profissional com esse email')
		}

		const expert = await this.expertsService.createExpert(data)
		return res.status(HttpStatus.CREATED).json(expert)
	}

	@Get()
	async getAll(@Res() res: Response) {
		const allExperts = await this.expertsService.findAllExperts()
		res.status(HttpStatus.OK).json(allExperts)
	}

	@Get()
	async getOne(@Body() email: string, @Res() res: Response) {
		const allExperts = await this.expertsService.findAllExperts()
		res.status(HttpStatus.OK).json(allExperts)
	}
}
