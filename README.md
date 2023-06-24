[![npm](https://img.shields.io/npm/v/@deep-foundation/firebase-push-notification.svg)](https://www.npmjs.com/package/@deep-foundation/firebase-push-notification) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/firebase-push-notification) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links for working with [`@firebase/messaging`](https://www.npmjs.com/package/@firebase/messaging)

[**Documentation**](https://deep-foundation.github.io/firebase-push-notification/)

[**List of links**](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html)

<!-- # Overview
- PushNotification
- PushNotificationTitle
- PushNotificationBody
- PushNotificationImageUrl
- PushNotificationIconUrl
- Notify
- NotifyInsertHandler -->

# Usage
## Setup
### Service Account

- Insert [`ServiceAccount`] with string value  
You can find it in firebase console in settings of your project
- (optional) Insert [`UsesServiceAccount`] from `User` to [`ServiceAccount`] to make it active 
### Web Push Certificate

- Insert [`WebPushCertificate`] with string value  
You can find it in firebase console in settings of your project
- (optional) Insert [`UsesWebPushCertificate`] from `User` to [`WebPushCertificate`] to make it active 
### Device
- Insert [`Device`] 
This type is located in the [`@deep-foundation/capacitor-device`](https://www.npmjs.com/package/@deep-foundation/capacitor-device) package and it is recommended to use its library
- Insert [`DeviceRegistrationToken`]
It is recommended to use [registerDevice](https://deep-foundation.github.io/firebase-push-notification/functions/registerDevice.html) with [insertDeviceRegistrationToken](https://deep-foundation.github.io/firebase-push-notification/functions/insertDeviceRegistrationToken.html)
## Push Notification
- Insert [`PushNotification`]
- Insert any link with string value that contains title for yout push notification  
You can use `SyncTextFile` from [`@deep-foundation/core`](https://www.npmjs.com/package/@deep-foundation/core) to do it.
- Insert [`PushNotification`] from [`PushNotificationTitle`] to `SyncTextFile` that contains title for push notification  
- Do the above two steps for [`PushNotificationBody`] and optionally for [`PushNotificationImageUrl`], [`PushNotificationIconUrl`]  
## Notify
- Insert [`Notify`] from [`PushNotification`] to [`Device`]  
- See push notification on your device :)

[`ServiceAccount`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#ServiceAccount
[`UsesServiceAccount`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#UsesServiceAccount
[`WebPushCertificate`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#WebPushCertificate
[`UsesWebPushCertificate`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#UsesWebPushCertificate
[`Device`]: https://deep-foundation.github.io/capacitor-device/enums/CapacitorDeviceContains.html#Device
[`DeviceRegistrationToken`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#DeviceRegistrationToken
[`PushNotification`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotification
[`PushNotificationTitle`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationTitle
[`PushNotificationBody`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationBody
[`PushNotificationImageUrl`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationImageUrl
[`PushNotificationIconUrl`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationIconUrl
[`Notify`]: https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#Notify
