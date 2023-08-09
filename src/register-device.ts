import { Device } from '@capacitor/device';
import { PushNotifications } from '@capacitor/push-notifications';
import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { BoolExpLink } from '@deep-foundation/deeplinks/imports/client.js_types';
import { getToken, Messaging, onMessage } from '@firebase/messaging';
import { getDeviceRegistrationTokenInsertSerialOperations } from './get-device-registration-token-insert-serial-operations';
import createDebugMessage from 'debug';
import { Package } from './package.js';

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
        const {serialOperations} = await getDeviceRegistrationTokenInsertSerialOperations({
          deep,
          deviceRegistrationToken,
          containerLinkId: deviceLinkId,
        });
        await deep.serial({
          operations: serialOperations,
        })
      }
  }
}

async function getPushCertificateLink({ deep }: { deep: DeepClient }) {
  const $package = new Package({ deep });
  const webPushCertificateTypeLinkId = await $package.WebPushCertificate.id();
  const usesWebPushCertificateTypeLinkId = await $package.UsesWebPushCertificate.id();
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
