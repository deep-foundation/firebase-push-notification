import { DeepClient } from '@deep-foundation/deeplinks/imports/client';
import { PACKAGE_NAME } from './package-name';
import { LinkName } from './contains';

/**
 * Inserts web push sertificate
 * 
 * @example
```ts
const { webPushCertificateLinkId } = await insertWebPushCertificate({
  deep,
  webPushCertificate,
  shouldMakeActive,
})
```
 */
export async function insertWebPushCertificate(
  param: InsertWebPushCertificateParam
): Promise<InsertWebPushCertificateResult> {
  const { deep, webPushCertificate, shouldMakeActive = false } = param;
  const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
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

  const {data: [{id: webPushCertificateLinkId}]} =  await deep.insert({
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

  return {webPushCertificateLinkId}
}

export interface InsertWebPushCertificateParam {
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Web Push Certificate
   */
  webPushCertificate: string;
  /**
   * Is this web push certificate should be made active
   * 
   * @remarks
   * You can have multiple web push certificate and only one can be active. It is made active when UsesServiceAccount is pointing to it
   */
  shouldMakeActive?: boolean;
}

export interface InsertWebPushCertificateResult {
  /**
   * Web Push Certificate Link Id
   */
  webPushCertificateLinkId: number;
}