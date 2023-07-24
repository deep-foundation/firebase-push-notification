import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { Package } from './package';

/**
  * Gets serial operations to insert {@link Package.WebPushCertificate}
  * 
  * @example
  * #### Insert {@link Package.WebPushCertificate}
 ```ts
 const {serialOperations, linkIds} = await getWebPushCertificateInsertSerialOperations({
   deep
 });
 await deep.serial({
   operations: serialOperations
 })
 ```
   * #### Insert {@link Package.WebPushCertificate} with reserved link id
  ```ts
  const reservedLinkIds = await deep.reserve(2);
  const webPushCertificateLinkId = reservedLinkIds.pop();
  const containLinkId = reservedLinkIds.pop();
  
  const {serialOperations, linkIds} = await getWebPushCertificateInsertSerialOperations({
    deep,
    webPushCertificate: {
      title,
      body,
    },
    reservedLinkIds: {
      webPushCertificateLinkId,
      containLinkId,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
  */
export async function getWebPushCertificateInsertSerialOperations(
  param: GetWebPushCertificateInsertSerialOperationsParam
): Promise<GetWebPushCertificateInsertSerialOperationsResult> {
  const {
    deep,
    webPushCertificate,
    valueForContainForWebPushCertificate,
    valueForContainForUsesWebPushCertificate,
    shouldMakeActive = false
  } = param;
  const $package = new Package({deep});
  const containerLinkId = param.containerLinkId !== null ? param.containerLinkId ?? deep.linkId : null;
  const reservedLinkIds = await getReservedLinkIds();
  const { containForWebPushCertificateLinkId: containLinkId, webPushCertificateLinkId, usesWebPushCertificateLinkId,containForUsesWebPushCertificateLinkId } = reservedLinkIds;
  const typeLinkIds = await getTypeLinkIds();
  const { containTypeLinkId, webPushCertificateTypeLinkId ,usesWebPushCertificateTypeLinkId} = typeLinkIds;
  const serialOperations = [];
  const webPushCertificateInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: webPushCertificateLinkId,
      type_id: webPushCertificateTypeLinkId,
    },
  });
  serialOperations.push(webPushCertificateInsertSerialOperation);
  const valueOfWebPushCertificateInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'strings',
    objects: {
      link_id: webPushCertificateLinkId,
      value: webPushCertificate,
    },
  });
  serialOperations.push(valueOfWebPushCertificateInsertSerialOperation);
  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: containLinkId,
        type_id: containTypeLinkId,
        from_id: containerLinkId,
        to_id: webPushCertificateLinkId,
      },
    });
    serialOperations.push(containInsertSerialOperation);
    
    if(valueForContainForWebPushCertificate) {
      const valueForContainInsertSerialOperation = createSerialOperation({
        type: 'insert',
        table: 'strings',
        objects: {
          link_id: containLinkId,
          value: valueForContainForWebPushCertificate,
        },
      });
      serialOperations.push(valueForContainInsertSerialOperation);
    }
  }

  if(shouldMakeActive) {
    const usesWebPushCertificateInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: usesWebPushCertificateLinkId,
        type_id: usesWebPushCertificateTypeLinkId,
        from_id: deep.linkId,
        to_id: webPushCertificateLinkId,
      },
    })
    serialOperations.push(usesWebPushCertificateInsertSerialOperation);
    if(containerLinkId !== null) {
      const containForUsesWebPushCertificateInsertSerialOperation = createSerialOperation({
        type: 'insert',
        table: 'links',
        objects: {
          id: containForUsesWebPushCertificateLinkId,
          type_id: containTypeLinkId,
          from_id: containerLinkId,
          to_id: usesWebPushCertificateLinkId,
        }
      })
      serialOperations.push(containForUsesWebPushCertificateInsertSerialOperation);

      if(valueForContainForUsesWebPushCertificate) {
        const valueForContainInsertSerialOperation = createSerialOperation({
          type: 'insert',
          table: 'objects',
          objects: {
            link_id: containForUsesWebPushCertificateLinkId,
            value: valueForContainForUsesWebPushCertificate,
          },
        });
        serialOperations.push(valueForContainInsertSerialOperation);
      }
    }
  }

  return {
    serialOperations,
    linkIds: reservedLinkIds
  };

  type GetReservedLinkIdsResult = Required<
    Exclude<
      GetWebPushCertificateInsertSerialOperationsParam['reservedLinkIds'],
      undefined
    >
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containForWebPushCertificateLinkId: 0,
      webPushCertificateLinkId: 0,
      usesWebPushCertificateLinkId: 0,
      containForUsesWebPushCertificateLinkId: 0
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containForWebPushCertificateLinkId:
        param.reservedLinkIds?.containForWebPushCertificateLinkId ?? reservedLinkIds.pop()!,
      webPushCertificateLinkId:
        param.reservedLinkIds?.webPushCertificateLinkId ?? reservedLinkIds.pop()!,
      usesWebPushCertificateLinkId:
        param.reservedLinkIds?.usesWebPushCertificateLinkId ?? reservedLinkIds.pop()!,
      containForUsesWebPushCertificateLinkId:
        param.reservedLinkIds?.containForUsesWebPushCertificateLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Required<
    Exclude<GetWebPushCertificateInsertSerialOperationsParam['typeLinkIds'], undefined>
  >;

  async function getTypeLinkIds(): Promise<GetTypeLinkIdsResult> {
    const result: GetTypeLinkIdsResult = {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      webPushCertificateTypeLinkId:
        param.typeLinkIds?.webPushCertificateTypeLinkId ||
        await $package.WebPushCertificate.id(),
      usesWebPushCertificateTypeLinkId:
        param.typeLinkIds?.usesWebPushCertificateTypeLinkId ||
        await $package.UsesWebPushCertificate.id(),
    };
    return result;
  }
}

export interface GetWebPushCertificateInsertSerialOperationsParam {
  /**
   * Reserved link ids that will be used in the serial operations
   */
  reservedLinkIds?: {
    /**
     * Reserved link id for the webPushCertificate
     */
    webPushCertificateLinkId?: number;
    /**
     * Reserved link id for the contain
     */
    containForWebPushCertificateLinkId?: number;
    /**
     * Reserved link id for the usesWebPushCertificate
     */
    usesWebPushCertificateLinkId?: number;
    /**
     * Reserved link id for the contain for usesServiceAccount 
     */
    containForUsesWebPushCertificateLinkId?: number;
  };
  /**
   * Link ids of types that will be used in the serial operations
   */
  typeLinkIds?: {
    /**
     * Link id of the contain type
     */
    containTypeLinkId?: number;
    /**
     * Link id of the webPushCertificate type
     */
    webPushCertificateTypeLinkId?: number;
    /**
     * Link id of the usesWebPushCertificate type
     */
    usesWebPushCertificateTypeLinkId?: number;
  };
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Web Push Certificate 
   */
  webPushCertificate: string;
  /**
   * Link id of the container
   *
   * @remarks
   * If it is null, contain link will not be created
   * @defaultValue {@link GetWebPushCertificateInsertSerialOperationsParam.deep.linkId} if not provided or undefined
   */
  containerLinkId?: number | undefined | null;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetWebPushCertificateInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  valueForContainForWebPushCertificate?: string | undefined;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetWebPushCertificateInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  valueForContainForUsesWebPushCertificate?: string | undefined;
  /**
   * If true, the link will be made active by creating a {@link Package.UsesServiceAccount} link pointing to it
   * 
   * @defaultValue false
   */
  shouldMakeActive?: boolean;
}

export interface GetWebPushCertificateInsertSerialOperationsResult {
  serialOperations: Array<SerialOperation>,
  linkIds: Required<Exclude<GetWebPushCertificateInsertSerialOperationsParam['reservedLinkIds'], undefined>>,
}