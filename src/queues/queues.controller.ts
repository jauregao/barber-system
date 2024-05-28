import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Query,
	Res
} from '@nestjs/common'
import { QueuesService } from './queues.service'
import { Response } from 'express'
import CreateQueueDto from './dtos/create-queue'
import { ExpertsService } from 'src/experts/experts.service'

@Controller('queues')
export class QueuesController {
	constructor(
		private readonly queuesService: QueuesService,
		private readonly expertService: ExpertsService
	) {}

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

	@Get()
	async getExpertQueues(
		@Query('expertId') data: CreateQueueDto,
		@Res() res: Response
	) {
		if (data.expertId) {
			const expertExist = await this.expertService.findOne(data.expertId)

			if (!expertExist) {
				throw new NotFoundException('Profissional não encontrado.')
			}

			const queues = this.queuesService.getExpertQueues(data.expertId)
			return res.status(HttpStatus.OK).json(queues)
		}

		const queues = await this.queuesService.getQueues()
		return res.status(HttpStatus.OK).json(queues)
	}
}
