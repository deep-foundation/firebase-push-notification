import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client.js';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql/index.js';
import { Package } from './package.js';

/**
  * Gets serial operations to insert {@link Package.Notify}
  * 
  * @example
  * #### Insert {@link Package.Notify}
 ```ts
 const {serialOperations, linkIds} = await getNotifyInsertSerialOperations({
   deep
 });
 await deep.serial({
   operations: serialOperations
 })
 ```
   * #### Insert {@link Package.Notify} with reserved link id
  ```ts
  const reservedLinkIds = await deep.reserve(2);
  const notifyLinkId = reservedLinkIds.pop();
  const containLinkId = reservedLinkIds.pop();
  
  const {serialOperations, linkIds} = await getNotifyInsertSerialOperations({
    deep,
    notify: {
      title,
      body,
    },
    reservedLinkIds: {
      notifyLinkId,
      containLinkId,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
  */
export async function getNotifyInsertSerialOperations(
  param: GetNotifyInsertSerialOperationsParam
): Promise<GetNotifyInsertSerialOperationsResult> {
  const {
    deep,
    containValue,
    containerLinkId,
    pushNotificationLinkId,
    deviceLinkId
  } = param;
  const $package = new Package({deep});
  const reservedLinkIds = await getReservedLinkIds();
  const { containLinkId, notifyLinkId } = reservedLinkIds;
  const typeLinkIds = await getTypeLinkIds();
  const { containTypeLinkId, notifyTypeLinkId } = typeLinkIds;
  const serialOperations = [];
  const notifyInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: notifyLinkId,
      type_id: notifyTypeLinkId,
      from_id: pushNotificationLinkId,
      to_id: deviceLinkId,
    },
  });
  serialOperations.push(notifyInsertSerialOperation);
  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: containTypeLinkId,
        from_id: containerLinkId || deep.linkId,
        to_id: notifyLinkId,
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

  return {
    serialOperations,
    linkIds: reservedLinkIds
  };

  type GetReservedLinkIdsResult = Required<
    Exclude<
      GetNotifyInsertSerialOperationsParam['reservedLinkIds'],
      undefined
    >
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containLinkId: 0,
      notifyLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      notifyLinkId:
        param.reservedLinkIds?.notifyLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Required<
    Exclude<GetNotifyInsertSerialOperationsParam['typeLinkIds'], undefined>
  >;

  async function getTypeLinkIds(): Promise<GetTypeLinkIdsResult> {
    const result: GetTypeLinkIdsResult = {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      notifyTypeLinkId:
        param.typeLinkIds?.notifyTypeLinkId ||
        await $package.Notify.id(),
    };
    return result;
  }
}

export interface GetNotifyInsertSerialOperationsParam {
  /**
   * Reserved link ids that will be used in the serial operations
   */
  reservedLinkIds?: {
    /**
     * Reserved link id for the notify
     */
    notifyLinkId?: number;
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
     * Link id of the notify type
     */
    notifyTypeLinkId?: number;
  };
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Link id of the container
   *
   * @remarks
   * If it is null, contain link will not be created
   * @defaultValue {@link GetNotifyInsertSerialOperationsParam.deep.linkId} if not provided or undefined
   */
  containerLinkId?: number | undefined | null;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetNotifyInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  containValue?: string | undefined;
  /**
   * Link id of the push notification
   */
  pushNotificationLinkId: number;
  /**
   * Link id of the device
   */
  deviceLinkId: number;
}

export interface GetNotifyInsertSerialOperationsResult {
  serialOperations: Array<SerialOperation>,
  linkIds: Required<Exclude<GetNotifyInsertSerialOperationsParam['reservedLinkIds'], undefined>>,
}