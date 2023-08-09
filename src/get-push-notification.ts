import { DeepClient } from '@deep-foundation/deeplinks/imports/client.js';
import { PushNotification } from './push-notification';
import { Package } from './package.js';
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
  const $package = new Package({ deep });
  const titleTypeLinkId = await $package.PushNotificationTitle.id();
  const bodyTypeLinkId = await $package.PushNotificationBody.id();
  const pushNotificationTreeLinkId = await $package.PushNotificationTree.id();

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

  return {
    title: linkWithTitle?.to.value.value,
    body: linkWithBody.to.value.value,
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