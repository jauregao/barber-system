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
		const startOfDay = new Date()
		startOfDay.setHours(0, 0, 0, 0)

		const endOfDay = new Date()
		endOfDay.setHours(23, 59, 59, 999)

		return await this.prisma.queue.findFirst({
			where: {
				createdAt: {
					gte: startOfDay,
					lt: endOfDay
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
			},
			include: {
				expert: true
			}
		})
	}

	async getQueuesToday() {
		const queueToday = await this.prisma.queue.findMany({
			where: {
				createdAt: {
					equals: new Date()
				},
				QueueCustomer: {
					some: {
						wasAttended: true
					}
				}
			},
			include: {
				expert: true,
				QueueCustomer: true
			}
		})
		return queueToday
	}
}
