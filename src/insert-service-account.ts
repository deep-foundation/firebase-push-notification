import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { BoolExpLink } from '@deep-foundation/deeplinks/imports/client_types';
import { PACKAGE_NAME } from './package-name';
import { FirebasePushNotificationContains } from './contains';

/**
 * Inserts service account
 * 
 * @example
```ts
const { serviceAccountLinkId } = await insertServiceAccount({
  deep,
  serviceAccount,
  shouldMakeActive,
})
```
 */
export async function insertServiceAccount(param: InsertServiceAccountParam): Promise<InsertServiceAccountResult> {
  const {
    deep,
    serviceAccount,
    shouldMakeActive = false,
  } = param;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
  const serviceAccountTypeLinkId = await deep.id(
    PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.ServiceAccount
    ]
  );
  const usesServiceAccountTypeLinkId = await deep.id(
    PACKAGE_NAME,
    FirebasePushNotificationContains[
      FirebasePushNotificationContains.UsesServiceAccount
    ]
  );

  if (shouldMakeActive) {
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

  const {data: [{id: serviceAccountLinkId}]} = await deep.insert({
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
        ...(shouldMakeActive
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

  return {serviceAccountLinkId}
}

export interface InsertServiceAccountParam {
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Service Account
   * 
   * @remarks
   * You can find it in firebase console under project settings
   */
  serviceAccount: object;
  /**
   * Is this service account should be made active
   * 
   * @remarks
   * You can have multiple service account and only one can be active. It is made active when UsesServiceAccount is pointing to it
   */
  shouldMakeActive?: boolean;
}

export interface InsertServiceAccountResult {
  /**
   * Service Account Link Id
   */
  serviceAccountLinkId: number;
}