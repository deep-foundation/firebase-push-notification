/**
 * Contains names of all contains of this package
 * 
 * @example
```ts
const notifyTypeLinkId = await deep.id(
   FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
   FirebasePushNotificationContains[FirebasePushNotificationContains.Notify]
)
```
 */
export enum LinkName {
   DeviceRegistrationToken,
   PushNotification,
   PushNotificationBody,
   PushNotificationImageUrl,
   PushNotificationIconUrl,
   PushNotificationTitle,
   ServiceAccount,
   UsesServiceAccount,
   WebPushCertificate,
   UsesWebPushCertificate,
   PushNotificationTree
}