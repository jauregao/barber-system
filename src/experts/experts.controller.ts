import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Put,
	Res,
	UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { ExpertsService } from './experts.service'
import CreateExpertDto from './dtos/create-experts'
import UpdateExpertDto from './dtos/update-experts'
import { JwtAuthGuard } from 'src/auth/guards/strategies/jwt-auth.guards'

@Controller('experts')
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() data: CreateExpertDto, @Res() res: Response) {
		const expertExists = await this.expertsService.findExpertByEmail(data.email)
		if (expertExists) {
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

	@Get(':id')
	async getOne(@Param('id') id: string, @Res() res: Response) {
		const expert = await this.expertsService.findOne(id)

		if (!expert) {
			throw new NotFoundException('Profissional não encontrado.')
		}
		res.status(HttpStatus.OK).json(expert)
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	async update(
		@Param() id: string,
		@Body() data: UpdateExpertDto,
		@Res() res: Response
	) {
		const expert = await this.expertsService.findOne(id)

		if (!expert) {
			throw new NotFoundException('Profissional não encontrado.')
		}

		if (data.email) {
			const emailExist = await this.expertsService.findExpertByEmail(data.email)
			if (emailExist && emailExist.email !== data.email) {
				throw new BadRequestException(
					'Já existe um profissional com esse email'
				)
			}
		}

		await this.expertsService.updateExpert(id, { ...expert, ...data })
		res.status(HttpStatus.NO_CONTENT).json()
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.expertsService.deleteExpert(id)
		res.status(HttpStatus.NO_CONTENT).json()
	}
}
