import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME } from './package-name';
import { FirebasePushNotificationContains } from './contains';

export async function insertWebPushCertificate(
  param: InsertWebPushCertificateParam
) {
  const { deep, webPushCertificate, shouldMakeActive = false } = param;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const webPushCertificateTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.WebPushCertificate
    ]
  );
  const usesWebPushCertificateTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.UsesWebPushCertificate
    ]
  );

  if (shouldMakeActive) {
    await deep.delete({
      up: {
        tree_id: { _eq: await deep.id('@deep-foundation/core', 'containTree') },
        parent: {
          type_id: { _id: ['@deep-foundation/core', 'Contain'] },
          to: { type_id: usesWebPushCertificateTypeLinkId },
          from_id: deep.linkId,
        },
      },
    });
  }

  await deep.insert({
    type_id: webPushCertificateTypeLinkId,
    string: {
      data: {
        value: webPushCertificate,
      },
    },
    in: {
      data: [
        {
          type_id: containTypeLinkId,
          from_id: deep.linkId,
        },
        ...(shouldMakeActive
          ? [
              {
                type_id: usesWebPushCertificateTypeLinkId,
                from_id: deep.linkId,
                in: {
                  data: [
                    {
                      type_id: containTypeLinkId,
                      from_id: deep.linkId,
                    },
                  ],
                },
              },
            ]
          : []),
      ],
    },
  });
}

export interface InsertWebPushCertificateParam {
  deep: DeepClient;
  webPushCertificate: string;
  shouldMakeActive?: boolean;
}
