import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { BoolExpLink } from '@deep-foundation/deeplinks/imports/client_types';
import { FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME } from './package-name';
import { FirebasePushNotificationContains } from './contains';

export async function insertServiceAccount(param: InsertServiceAccountParam) {
  const {
    deep,
    serviceAccount,
    makeActive = false,
  } = param;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const serviceAccountTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.ServiceAccount
    ]
  );
  const usesServiceAccountTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.UsesServiceAccount
    ]
  );

  if (makeActive) {
    await deep.delete({
      up: {
        tree_id: { _eq: await deep.id('@deep-foundation/core', 'containTree') },
        parent: {
          type_id: { _id: ['@deep-foundation/core', 'Contain'] },
          to: { type_id: usesServiceAccountTypeLinkId },
          from_id: deep.linkId,
        },
      },
    });
  }

  await deep.insert({
    type_id: serviceAccountTypeLinkId,
    object: {
      data: {
        value: serviceAccount,
      },
    },
    in: {
      data: [
        {
          type_id: containTypeLinkId,
          from_id: deep.linkId,
        },
        ...(makeActive
          ? [
              {
                type_id: usesServiceAccountTypeLinkId,
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

export interface InsertServiceAccountParam {
  deep: DeepClient;
  serviceAccount: object;
  makeActive?: boolean;
}
