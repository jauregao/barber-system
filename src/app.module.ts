import { Module } from '@nestjs/common'
import { PrismaModule } from './database/prisma.module'
import { ExpertsModule } from './experts/experts.module'
import { QueuesModule } from './queues/queues.module'
import { QueuecustomersModule } from './queuecustomers/queuecustomers.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		PrismaModule,
		ExpertsModule,
		QueuesModule,
		QueuecustomersModule,
		UsersModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
