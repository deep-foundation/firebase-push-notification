import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { PushNotification } from './push-notification';
import { Package } from './package';

/**
  * Gets serial operations to insert {@link Package.PushNotification}
  * 
  * @example
  * #### Insert {@link Package.PushNotification}
 ```ts
 const {serialOperations, linkIds} = await getPushNotificationInsertSerialOperations({
   deep
 });
 await deep.serial({
   operations: serialOperations
 })
 ```
   * #### Insert {@link Package.PushNotification} with reserved link id
  ```ts
  const reservedLinkIds = await deep.reserve(2);
  const pushNotificationLinkId = reservedLinkIds.pop();
  const containLinkId = reservedLinkIds.pop();
  
  const {serialOperations, linkIds} = await getPushNotificationInsertSerialOperations({
    deep,
    pushNotification: {
      title,
      body,
    },
    reservedLinkIds: {
      pushNotificationLinkId,
      containLinkId,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
  */
export async function getPushNotificationInsertSerialOperations(
  param: GetPushNotificationInsertSerialOperationsParam
): Promise<GetPushNotificationInsertSerialOperationsResult> {
  const {
    deep,
    pushNotification,
    containValue,
    containerLinkId,
  } = param;
  const $package = new Package({deep});
  const reservedLinkIds = await getReservedLinkIds();
  const { containLinkId, pushNotificationLinkId } = reservedLinkIds;
  const typeLinkIds = await getTypeLinkIds();
  const { containTypeLinkId, pushNotificationTypeLinkId } = typeLinkIds;
  const serialOperations = [];
  const pushNotificationInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: pushNotificationLinkId,
      type_id: pushNotificationTypeLinkId,
    },
  });
  serialOperations.push(pushNotificationInsertSerialOperation);
  const valueOfPushNotificationInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'objects',
    objects: {
      link_id: pushNotificationLinkId,
      value: pushNotification,
    },
  });
  serialOperations.push(valueOfPushNotificationInsertSerialOperation);
  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: containTypeLinkId,
        from_id: containerLinkId || deep.linkId,
        to_id: pushNotificationLinkId,
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
      GetPushNotificationInsertSerialOperationsParam['reservedLinkIds'],
      undefined
    >
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containLinkId: 0,
      pushNotificationLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      pushNotificationLinkId:
        param.reservedLinkIds?.pushNotificationLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Required<
    Exclude<GetPushNotificationInsertSerialOperationsParam['typeLinkIds'], undefined>
  >;

  async function getTypeLinkIds(): Promise<GetTypeLinkIdsResult> {
    const result: GetTypeLinkIdsResult = {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      pushNotificationTypeLinkId:
        param.typeLinkIds?.pushNotificationTypeLinkId ||
        await $package.PushNotification.id(),
    };
    return result;
  }
}

export interface GetPushNotificationInsertSerialOperationsParam {
  /**
   * Reserved link ids that will be used in the serial operations
   */
  reservedLinkIds?: {
    /**
     * Reserved link id for the pushNotification
     */
    pushNotificationLinkId?: number;
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
     * Link id of the pushNotification type
     */
    pushNotificationTypeLinkId?: number;
  };
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * PushNotification 
   */
  pushNotification: PushNotification;
  /**
   * Link id of the container
   *
   * @remarks
   * If it is null, contain link will not be created
   * @defaultValue {@link GetPushNotificationInsertSerialOperationsParam.deep.linkId} if not provided or undefined
   */
  containerLinkId?: number | undefined | null;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetPushNotificationInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  containValue?: string | undefined;
}

export interface GetPushNotificationInsertSerialOperationsResult {
  serialOperations: Array<SerialOperation>,
  linkIds: Required<Exclude<GetPushNotificationInsertSerialOperationsParam['reservedLinkIds'], undefined>>,
}