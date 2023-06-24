import {NotificationPayload} from '@firebase/messaging';
import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME } from "./package-name";
import { PushNotification } from './push-notification';
import { FirebasePushNotificationContains } from './contains';

/**
 * Inserts push notification
 */
export async function insertPushNotification(param: InsertPushNotificationParam): Promise<InsertPushNotificationResult> {
  const {deep, pushNotification, containerLinkId = deep.linkId} = param
  const pushNotificationTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[FirebasePushNotificationContains.PushNotification]
  );
  const titleTypeLinkId = await deep.id(FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME, FirebasePushNotificationContains[FirebasePushNotificationContains.PushNotificationTitle]);
  const bodyTypeLinkId = await deep.id(FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME, FirebasePushNotificationContains[FirebasePushNotificationContains.PushNotificationBody]);
  const imageUrlTypeLinkId = await deep.id(FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME, FirebasePushNotificationContains[FirebasePushNotificationContains.PushNotificationImageUrl]);
  const syncTextFileTypeLinkId = await deep.id(
    '@deep-foundation/core',
    'SyncTextFile'
  );
  const containTypeLinkId = await deep.id(
    '@deep-foundation/core',
    'Contain'
  );
  const {data: [{id: pushNotificationLinkId}]} = await deep.insert({
    type_id: pushNotificationTypeLinkId,
    in: {
      data: [
        {
          type_id: containTypeLinkId,
          from_id: containerLinkId,
        },
      ],
    },
    out: {
      data: [
        {
          type_id: titleTypeLinkId,
          to: {
            data: {
              type_id: syncTextFileTypeLinkId,
              in: {
                data: [
                  {
                    type_id: containTypeLinkId,
                    from_id: containerLinkId,
                  },
                ],
              },
              string: {
                data: {
                  value: pushNotification.title,
                },
              },
            },
          },
          in: {
            data: [
              {
                type_id: containTypeLinkId,
                from_id: containerLinkId,
              },
            ],
          },
        },
        {
          type_id: bodyTypeLinkId,
          to: {
            data: {
              type_id: syncTextFileTypeLinkId,
              in: {
                data: [
                  {
                    type_id: containTypeLinkId,
                    from_id: containerLinkId,
                  },
                ],
              },
              string: {
                data: {
                  value: pushNotification.body,
                },
              },
            },
          },
          in: {
            data: [
              {
                type_id: containTypeLinkId,
                from_id: containerLinkId,
              },
            ],
          },
        },
        ...(pushNotification.image ? [{
          type_id: imageUrlTypeLinkId,
          to: {
            data: {
              type_id: syncTextFileTypeLinkId,
              in: {
                data: [
                  {
                    type_id: containTypeLinkId,
                    from_id: containerLinkId,
                  },
                ],
              },
              string: {
                data: {
                  value: pushNotification.body,
                },
              },
            },
          },
          in: {
            data: [
              {
                type_id: containTypeLinkId,
                from_id: containerLinkId,
              },
            ],
          },
        }] : [])
      ],
    },
  });
  return {pushNotificationLinkId};
}

export interface InsertPushNotificationParam {
  /**
   * Deep Client
   */
  deep: DeepClient, 
  /**
   * Push notification
   */
  pushNotification: PushNotification, 
  /**
   * Id of a link where links will be contained
   */
  containerLinkId?: number | undefined
}

export interface InsertPushNotificationResult {
  /**
   * Push notification link id
   */
  pushNotificationLinkId: number
}