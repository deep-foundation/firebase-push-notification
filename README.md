[![npm](https://img.shields.io/npm/v/@deep-foundation/firebase-push-notification.svg)](https://www.npmjs.com/package/@deep-foundation/firebase-push-notification) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/firebase-push-notification) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links for working with [`@firebase/messaging`](https://www.npmjs.com/package/@firebase/messaging)

[Documentation](https://deep-foundation.github.io/firebase-push-notification/)

# Overview
- PushNotification
- PushNotificationTitle
- PushNotificationBody
- PushNotificationImageUrl
- PushNotificationIconUrl
- Notify
- NotifyInsertHandler

# Usage
## Setup
### Service Account

- Insert [`ServiceAccount`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#ServiceAccount) with string value  
You can find it in firebase console in settings of your project
- (optional) Insert [`UsesServiceAccount`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#UsesServiceAccount) from `User` to [`ServiceAccount`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#ServiceAccount) to make it active 
### Web Push Certificate

- Insert [`WebPushCertificate`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#WebPushCertificate) with string value  
You can find it in firebase console in settings of your project
- (optional) Insert [`UsesWebPushCertificate`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#UsesWebPushCertificate) from `User` to [`WebPushCertificate`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#WebPushCertificate) to make it active 
### Device
- Insert [`Device`](https://deep-foundation.github.io/capacitor-device/enums/CapacitorDeviceContains.html#Device) 
This type is located in the [`@deep-foundation/capacitor-device`](https://www.npmjs.com/package/@deep-foundation/capacitor-device) package and it is recommended to use its library
- Insert [`DeviceRegistrationToken`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#DeviceRegistrationToken)
It is recommended to use [registerDevice](https://deep-foundation.github.io/firebase-push-notification/functions/registerDevice.html) with [insertDeviceRegistrationToken](https://deep-foundation.github.io/firebase-push-notification/functions/insertDeviceRegistrationToken.html)
## Push Notification
- Insert [`PushNotification`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotification)
- Insert any link with string value that contains title for yout push notification  
You can use `SyncTextFile` from [`@deep-foundation/core`](https://www.npmjs.com/package/@deep-foundation/core) to do it.
- Insert [`PushNotification`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationTitle) from [`PushNotificationTitle`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotification) to `SyncTextFile` that contains title for push notification  
- Do the above two steps for [`PushNotificationBody`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationBody) and optionally for [`PushNotificationImageUrl`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationImageUrl), [`PushNotificationIconUrl`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotificationIconUrl)  
## Notify
- Insert [`Notify`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#Notify) from [`PushNotification`](https://deep-foundation.github.io/firebase-push-notification/enums/FirebasePushNotificationContains.html#PushNotification) to [`Device`](https://deep-foundation.github.io/capacitor-device/enums/CapacitorDeviceContains.html#Device)  
- See push notification on your device :)

