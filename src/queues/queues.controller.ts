import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Post,
	Query,
	Res,
	UseGuards
} from '@nestjs/common'
import { QueuesService } from './queues.service'
import { Response } from 'express'
import CreateQueueDto from './dtos/create-queue'
import { ExpertsService } from 'src/experts/experts.service'
import { JwtAuthGuard } from 'src/auth/guards/strategies/jwt-auth.guards'

@Controller('queues')
export class QueuesController {
	constructor(
		private readonly queuesService: QueuesService,
		private readonly expertService: ExpertsService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
		const expertExist = await this.expertService.findOne(data.expertId)
		if (!expertExist) {
			throw new NotFoundException('Profissional não encontrado.')
		}

		const queueExists = await this.queuesService.queueExpertsExistsToday(
			data.expertId
		)
		if (queueExists) {
			throw new BadRequestException(
				'Fila já criada no dia de hoje para este profissional.'
			)
		}

		const queue = await this.queuesService.createQueue(data)
		return res.status(HttpStatus.CREATED).json(queue)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getExpertQueues(
		@Query('expertId') expertId: string,
		@Res() res: Response
	) {
		if (expertId) {
			const expertExist = await this.expertService.findOne(expertId)

			if (!expertExist) {
				throw new NotFoundException('Profissional não encontrado.')
			}

			const queues = await this.queuesService.getExpertQueues(expertId)
			return res.status(HttpStatus.OK).json(queues)
		}

		const queues = await this.queuesService.getQueues()
		return res.status(HttpStatus.OK).json(queues)
	}

	@Get('today')
	async getQueuesToday(@Res() res: Response) {
		const queues = await this.queuesService.getQueuesToday()
		return res.status(HttpStatus.OK).json(queues)
	}
}
