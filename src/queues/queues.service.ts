import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import CreateQueueDto from './dtos/create-queue'

@Injectable()
export class QueuesService {
	constructor(private readonly prisma: PrismaService) {}

	async createQueue(data: CreateQueueDto) {
		return await this.prisma.queue.create({ data })
	}

	async queueExpertsExistsToday(expertId: string) {
		return await this.prisma.queue.findFirst({
			where: {
				createdAt: {
					equals: new Date()
				},
				expertId
			}
		})
	}

	async getQueues() {
		return this.prisma.queue.findMany()
	}

	async getExpertQueues(expertId: string) {
		return this.prisma.queue.findMany({
			where: {
				expertId
			}
		})
	}
}
