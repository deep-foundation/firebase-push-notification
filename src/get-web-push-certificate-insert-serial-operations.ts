import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { LinkName } from './link-name';
import { PACKAGE_NAME } from './package-name';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';

/**
  * Gets serial operations to insert {@link LinkName.WebPushCertificate}
  * 
  * @example
  * #### Insert {@link LinkName.WebPushCertificate}
 ```ts
 const serialOperations = await getWebPushCertificateInsertSerialOperations({
   deep
 });
 await deep.serial({
   operations: serialOperations
 })
 ```
   * #### Insert {@link LinkName.WebPushCertificate} with reserved link id
  ```ts
  const reservedLinkIds = await deep.reserve(2);
  const webPushCertificateLinkId = reservedLinkIds.pop();
  const containLinkId = reservedLinkIds.pop();
  
  const serialOperations = await getWebPushCertificateInsertSerialOperations({
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
): Promise<Array<SerialOperation>> {
  const {
    deep,
    webPushCertificate,
    containValue,
    containerLinkId,
  } = param;
  const { containLinkId, webPushCertificateLinkId } = await getReservedLinkIds();
  const { containTypeLinkId, webPushCertificateTypeLinkId } = await getTypeLinkIds();
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
        type_id: containTypeLinkId,
        from_id: containerLinkId || deep.linkId,
        to_id: webPushCertificateLinkId,
      },
    });
    serialOperations.push(containInsertSerialOperation);
    const valueOfContainInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: containLinkId,
        value: containValue,
      },
    });
    serialOperations.push(valueOfContainInsertSerialOperation);
  }

  return serialOperations;

  type GetReservedLinkIdsResult = Required<
    Exclude<
      GetWebPushCertificateInsertSerialOperationsParam['reservedLinkIds'],
      undefined
    >
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containLinkId: 0,
      webPushCertificateLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      webPushCertificateLinkId:
        param.reservedLinkIds?.webPushCertificateLinkId ?? reservedLinkIds.pop()!,
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
        (await deep.id(PACKAGE_NAME, LinkName[LinkName.WebPushCertificate])),
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
    containLinkId?: number;
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
  containValue?: string | undefined;
}
