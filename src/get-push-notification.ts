import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME } from './package-name';
import { PushNotification } from './push-notification';
import { FirebasePushNotificationContains } from './contains';

export async function getPushNotification({
  deep,
  pushNotificationLinkId,
}: GetPushNotificationParam): Promise<PushNotification> {
  const titleTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.PushNotificationTitle
    ]
  );
  const bodyTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.PushNotificationBody
    ]
  );
  const imageUrlTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.PushNotificationImageUrl
    ]
  );
  const iconUrlTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.PushNotificationIconUrl
    ]
  );
  const pushNotificationTreeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.PushNotificationTree
    ]
  );

  const { data: linksDownToParentPushNotificationMp } = await deep.select(
    {
      up: {
        parent_id: { _eq: pushNotificationLinkId },
        tree_id: { _eq: pushNotificationTreeLinkId },
      },
    },
    {
      returning: `${deep.selectReturning}
    to {
      ${deep.selectReturning}
    }
    `,
    }
  );

  const linkWithTitle = linksDownToParentPushNotificationMp.find(
    (link) => link.type_id === titleTypeLinkId
  );
  if (!linkWithTitle) {
    throw new Error(`A link with type ##${titleTypeLinkId} is not found`);
  }

  const linkWithBody = linksDownToParentPushNotificationMp.find(
    (link) => link.type_id === bodyTypeLinkId
  );
  if (!linkWithBody) {
    throw new Error(`A link with type ##${bodyTypeLinkId} is not found`);
  }

  const linkWithImageUrl = linksDownToParentPushNotificationMp.find(
    (link) => link.type_id === imageUrlTypeLinkId
  );
  const linkWithIconUrl = linksDownToParentPushNotificationMp.find(
    (link) => link.type_id === iconUrlTypeLinkId
  );

  return {
    title: linkWithTitle?.to.value.value,
    body: linkWithBody.to.value.value,
    image: linkWithImageUrl?.to.value?.value,
    icon: linkWithIconUrl?.to.value?.value,
  };
}

export interface GetPushNotificationParam {
  deep: DeepClient;
  pushNotificationLinkId: number;
}
