[![npm](https://img.shields.io/npm/v/@deep-foundation/firebase-push-notification.svg)](https://www.npmjs.com/package/@deep-foundation/firebase-push-notification) 
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/firebase-push-notification) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

A deep package that provides links for working with [`@firebase/messaging`](https://www.npmjs.com/package/@firebase/messaging) and typescript library to simplify integration with this deep package

**[Documentation]**
# Usage

## Setup
### Service Account

- Insert [`ServiceAccount`] with string value  
You can find it in firebase console in settings of your project
- (optional) Insert [`UsesServiceAccount`] from `User` to [`ServiceAccount`] to make it active 
### Web Push Certificate

- Insert [`WebPushCertificate`] with string value  
You can find it in firebase console in settings of your project. You can use this url: https://console.firebase.google.com/project/PROJECT_ID/settings/serviceaccounts/adminsdk where you should change `PROJECT_ID` to your project id
- (optional) Insert [`UsesWebPushCertificate`] from `User` to [`WebPushCertificate`] to make it active 
### Device
- Insert [`Device`] 
This type is located in the [`@deep-foundation/capacitor-device`](https://www.npmjs.com/package/@deep-foundation/capacitor-device) package and it is recommended to use its library
- Insert [`DeviceRegistrationToken`]
It is recommended to use [registerDevice](https://deep-foundation.github.io/firebase-push-notification/functions/registerDevice.html) with [insertDeviceRegistrationToken](https://deep-foundation.github.io/firebase-push-notification/functions/insertDeviceRegistrationToken.html)
## Push Notification
- Insert [`PushNotification`]
- Update its value to object like that contains `title` and `body` fields:
  ```json
  {
    "title": "My Title",
    "body": "My Body"
  }
  ```
## Notify
- Insert [`Notify`] from [`PushNotification`] to [`Device`]  
- See push notification on your device :)

## Client
To receive messages on Client read [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)

# Library
## Library Usage
See [Documentation] for examples and API

[Documentation]: https://deep-foundation.github.io/firebase-push-notification/
[`ServiceAccount`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#ServiceAccount
[`UsesServiceAccount`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#UsesServiceAccount
[`WebPushCertificate`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#WebPushCertificate
[`UsesWebPushCertificate`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#UsesWebPushCertificate
[`Device`]: https://deep-foundation.github.io/capacitor-device/classes/Package.html#Device
[`DeviceRegistrationToken`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#DeviceRegistrationToken
[`PushNotification`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#PushNotification
[`PushNotificationTitle`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#PushNotificationTitle
[`PushNotificationBody`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#PushNotificationBody
[`PushNotificationImageUrl`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#PushNotificationImageUrl
[`PushNotificationIconUrl`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#PushNotificationIconUrl
[`Notify`]: https://deep-foundation.github.io/firebase-push-notification/classes/Package.html#Notify
