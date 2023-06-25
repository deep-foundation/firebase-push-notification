/**
 * Contains names of all contains of this package
 * 
 * @example
```ts
const notifyTypeLinkId = await deep.id(
   PACKAGE_NAME,
   LinkName[LinkName.Notify]
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