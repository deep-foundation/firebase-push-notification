import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { PACKAGE_NAME } from './package-name';
import { PushNotification } from './push-notification';
import { LinkName } from './link-name';

/**
 * Gets push notification from deep
 * 
 * @throws {Error} If title is not found
 * @throws {Error} If body is not found
 * 
 * @example
```ts
const pushNotification = await getPushNotification({
  deep,
  pushNotificationLinkId,
})
```
 */
export async function getPushNotification({
  deep,
  pushNotificationLinkId,
}: GetPushNotificationParam): Promise<GetPushNotificationResult> {
  const titleTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.PushNotificationTitle
    ]
  );
  const bodyTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.PushNotificationBody
    ]
  );
  const imageUrlTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.PushNotificationImageUrl
    ]
  );
  const iconUrlTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.PushNotificationIconUrl
    ]
  );
  const pushNotificationTreeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[
      LinkName.PushNotificationTree
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
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Link id of push notification
   */
  pushNotificationLinkId: number;
}

export type GetPushNotificationResult = PushNotification;