import { Device } from '@capacitor/device';
import { PushNotifications } from '@capacitor/push-notifications';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { BoolExpLink } from '@deep-foundation/deeplinks/imports/client_types';
import { getToken, Messaging, onMessage } from '@firebase/messaging';
import { insertDeviceRegistrationToken } from './insert-device-registration-token';
import { PACKAGE_NAME } from './package-name';
import { LinkName } from './contains';

/**
 * Registers device
 * 
 * @remarks
 * This function also handle onMessage event
 * 
 * @example
```ts
await registerDevice({
  deep,
  deviceLinkId,
  firebaseMessaging,
})
```
 */
export async function registerDevice({
  deep,
  deviceLinkId,
  firebaseMessaging,
  callback,
}: RegisterDeviceParam) {
  const {platform} = await Device.getInfo();
  if (platform === 'web') {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      './firebase-messaging-sw.js',
      { scope: 'firebase-cloud-messaging-push-scope' }
    );

    const webPushCertificateLink = await getPushCertificateLink({ deep });
    const webPushCertificate = webPushCertificateLink.value.value;

    const deviceRegistrationToken = await getToken(firebaseMessaging, {
      serviceWorkerRegistration,
      vapidKey: webPushCertificate,
    });

    onDeviceRegistration({ value: deviceRegistrationToken });

    onMessage(firebaseMessaging, async (payload) => {
      console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
      );
      if (!payload.notification) {
        return;
      }
      if (!payload.notification.title) {
        return;
      }

      // Let's check if the browser supports notifications
      if (!('Notification' in window)) {
        throw new Error('This browser does not support desktop notification');
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === 'granted') {
        // If it's okay, let's create a notification
        new Notification(payload.notification.title, payload.notification);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification(payload.notification.title, payload.notification);
        }
      }
    });
  } else {
    await PushNotifications.removeAllListeners();
    await PushNotifications.addListener('registration', onDeviceRegistration);
    await PushNotifications.register();
  }

  async function onDeviceRegistration({
    value: deviceRegistrationToken,
  }: {
    value: string;
  }) {
      if(callback) {
        callback({deviceRegistrationToken})
      } else {
        await insertDeviceRegistrationToken({
          deep,
          deviceRegistrationToken,
          deviceLinkId,
        });
      }
  }
}

async function getPushCertificateLink({ deep }: { deep: DeepClient }) {
  const webPushCertificateTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.WebPushCertificate
    ]
  );
  const usesWebPushCertificateTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.UsesWebPushCertificate
    ]
  );
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const selectData: BoolExpLink = {
    _or: [
      {
        type_id: webPushCertificateTypeLinkId,
        in: {
          type_id: containTypeLinkId,
          from_id: deep.linkId,
        },
      },
      {
        type_id: usesWebPushCertificateTypeLinkId,
        from_id: deep.linkId,
      },
    ],
  };
  const { data } = await deep.select(selectData);
  let webPushCertificateLink;
  if (data.length === 0) {
    throw new Error(
      `Select with data ${JSON.stringify(selectData)} returned empty result`
    );
  }
  const usesWebPushCertificateLinks = data.filter(
    (link) => link.type_id === usesWebPushCertificateTypeLinkId
  );
  if (usesWebPushCertificateLinks.length > 1) {
    throw new Error(
      `Select with data ${JSON.stringify(
        selectData
      )} returned more than one link of type ##${usesWebPushCertificateTypeLinkId}: ${usesWebPushCertificateLinks
        .map((link) => `##${link.id}`)
        .join(',')}`
    );
  } else if (usesWebPushCertificateLinks.length === 1) {
    const usesWebPushCertificateLink = usesWebPushCertificateLinks[0];
    webPushCertificateLink = data.find(
      (link) => link.id === usesWebPushCertificateLink.to_id
    );
  } else {
    const webPushCertificateLinks = data.filter(
      (link) => link.type_id === webPushCertificateTypeLinkId
    );
    if (webPushCertificateLinks.length > 1) {
      throw new Error(
        `Select with data ${JSON.stringify(
          selectData
        )} returned more than one link of type ##${webPushCertificateTypeLinkId}: ${webPushCertificateLinks
          .map((link) => `##${link.id}`)
          .join(',')}`
      );
    }
    webPushCertificateLink = webPushCertificateLinks[0];
  }
  if (!webPushCertificateLink) {
    throw new Error(
      // `A link with type ##${usesWebPushCertificateTypeLinkId}, from ##${deep.linkId} to ##${webPushCertificateTypeLinkId} is not found`
      `${JSON.stringify(selectData)} query has found 0 links`
    );
  }
  if (!webPushCertificateLink.value?.value) {
    throw new Error(`##${webPushCertificateLink.id} must have a value`);
  }
  return webPushCertificateLink;
}

export interface RegisterDeviceParam {
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Device link id
   */
  deviceLinkId: number;
  /**
   * Firebase Messaging
   */
  firebaseMessaging: Messaging;
  /**
   * Callback to be called when device registration token is received
   */
  callback: ({
    deviceRegistrationToken,
  }: {
    deviceRegistrationToken: string;
  }) => void;
}
