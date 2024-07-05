export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>