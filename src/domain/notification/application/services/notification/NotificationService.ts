import { left, right } from "src/core/utils/either"
import { NotificationsRepository } from "../../repositories/notifications-repository"
import { ReadNotificationUseCaseRequest } from "./contracts/ReadNotificationUseCaseRequest"
import { ReadNotificationUseCaseResponse } from "./contracts/ReadNotificationUseCaseResponse"
import { SendNotificationUseCaseRequest } from "./contracts/SendNotificationUseCaseRequest"
import { EntityID } from "src/core/entities/EntityID"
import { Notification } from "src/domain/notification/enterprise/entities/Notification"
import { SendNotificationUseCaseResponse } from "./contracts/SendNotificationUseCaseResponse"

class NotificationService {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async readNotification({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }

  async sendNotification({ recipientId, title, content, }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {

    const notification = new Notification({
      recipientId: new EntityID(recipientId),
      title,
      content,
      createdAt: new Date()
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }

}