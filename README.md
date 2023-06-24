[![npm](https://img.shields.io/npm/v/@deep-foundation/firebase-push-notification.svg)](https://www.npmjs.com/package/@deep-foundation/firebase-push-notification) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/firebase-push-notification) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Provides links for working with @firebase/messaging

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
Insert ServiceAccount (you can find it in firebase console in settings of your project)
Insert WebPushCertificate (you can find it in firebase console in settings of your project)
Insert Device (this type is located in `@deep-foundation/capacitor-device` and it is recommended to use its library)
Insert DeviceRegistrationToken (it is recommended to use [registerDevice](https://deep-foundation.github.io/firebase-push-notification/functions/registerDevice.html) with [insertDeviceRegistrationToken](https://deep-foundation.github.io/firebase-push-notification/functions/insertDeviceRegistrationToken.html))
Insert PushNotification  
Insert SyncTextFile or any other link that can hold string value and put string value that contains title for push notification  
Insert PushNotificationTitle from PushNotification to SyncTextFile that contains title for push notification  
Do the above two steps for PushNotificationBody and optionally for PushNotificationImageUrl, PushNotificationIconUrl  
Insert Notify from PushNotification to Device  
See push notification on your device :)

