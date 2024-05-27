import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import CreateExpertDto from './dtos/create-experts'
import UpdateExpertDto from './dtos/update-experts'

@Injectable()
export class ExpertsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAllExperts() {
		return await this.prismaService.expert.findMany()
	}

	async findOne(id: string) {
		return await this.prismaService.expert.findFirst({
			where: {
				id
			}
		})
	}

	async findExpertByEmail(email: string) {
		return await this.prismaService.expert.findFirst({
			where: {
				email
			}
		})
	}

	async createExpert(data: CreateExpertDto): Promise<CreateExpertDto> {
		return await this.prismaService.expert.create({ data })
	}

	async updateExpert(id: string, data: UpdateExpertDto) {
		return await this.prismaService.expert.update({
			data,
			where: {
				id
			}
		})
	}

	async deleteExpert(email: string) {
		return await this.prismaService.expert.delete({ where: { email } })
	}
}
