import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { LinkName } from './link-name';
import { PACKAGE_NAME } from './package-name';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';

/**
  * Gets serial operations to insert {@link LinkName.DeviceRegistrationToken}
  * 
  * @example
  * #### Insert {@link LinkName.DeviceRegistrationToken}
 ```ts
 const serialOperations = await getDeviceRegistrationTokenInsertSerialOperations({
   deep
 });
 await deep.serial({
   operations: serialOperations
 })
 ```
   * #### Insert {@link LinkName.DeviceRegistrationToken} with reserved link id
  ```ts
  const reservedLinkIds = await deep.reserve(2);
  const deviceRegistrationTokenLinkId = reservedLinkIds.pop();
  const containLinkId = reservedLinkIds.pop();
  
  const serialOperations = await getDeviceRegistrationTokenInsertSerialOperations({
    deep,
    deviceRegistrationToken: {
      title,
      body,
    },
    reservedLinkIds: {
      deviceRegistrationTokenLinkId,
      containLinkId,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
  */
export async function getDeviceRegistrationTokenInsertSerialOperations(
  param: GetDeviceRegistrationTokenInsertSerialOperationsParam
): Promise<Array<SerialOperation>> {
  const {
    deep,
    deviceRegistrationToken,
    containValue,
    containerLinkId,
  } = param;
  const { containLinkId, deviceRegistrationTokenLinkId } = await getReservedLinkIds();
  const { containTypeLinkId, deviceRegistrationTokenTypeLinkId } = await getTypeLinkIds();
  const serialOperations = [];
  const deviceRegistrationTokenInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: deviceRegistrationTokenLinkId,
      type_id: deviceRegistrationTokenTypeLinkId,
    },
  });
  serialOperations.push(deviceRegistrationTokenInsertSerialOperation);
  const valueOfDeviceRegistrationTokenInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'strings',
    objects: {
      link_id: deviceRegistrationTokenLinkId,
      value: deviceRegistrationToken,
    },
  });
  serialOperations.push(valueOfDeviceRegistrationTokenInsertSerialOperation);
  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: containTypeLinkId,
        from_id: containerLinkId || deep.linkId,
        to_id: deviceRegistrationTokenLinkId,
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
      GetDeviceRegistrationTokenInsertSerialOperationsParam['reservedLinkIds'],
      undefined
    >
  >;

  async function getReservedLinkIds(): Promise<GetReservedLinkIdsResult> {
    let result: GetReservedLinkIdsResult = {
      containLinkId: 0,
      deviceRegistrationTokenLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      deviceRegistrationTokenLinkId:
        param.reservedLinkIds?.deviceRegistrationTokenLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Required<
    Exclude<GetDeviceRegistrationTokenInsertSerialOperationsParam['typeLinkIds'], undefined>
  >;

  async function getTypeLinkIds(): Promise<GetTypeLinkIdsResult> {
    const result: GetTypeLinkIdsResult = {
      containTypeLinkId:
        param.typeLinkIds?.containTypeLinkId ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      deviceRegistrationTokenTypeLinkId:
        param.typeLinkIds?.deviceRegistrationTokenTypeLinkId ||
        (await deep.id(PACKAGE_NAME, LinkName[LinkName.DeviceRegistrationToken])),
    };
    return result;
  }
}

export interface GetDeviceRegistrationTokenInsertSerialOperationsParam {
  /**
   * Reserved link ids that will be used in the serial operations
   */
  reservedLinkIds?: {
    /**
     * Reserved link id for the deviceRegistrationToken
     */
    deviceRegistrationTokenLinkId?: number;
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
     * Link id of the deviceRegistrationToken type
     */
    deviceRegistrationTokenTypeLinkId?: number;
  };
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Device Registration Token 
   */
  deviceRegistrationToken: string;
  /**
   * Link id of the container
   *
   * @remarks
   * If it is null, contain link will not be created
   * @defaultValue {@link GetDeviceRegistrationTokenInsertSerialOperationsParam.deep.linkId} if not provided or undefined
   */
  containerLinkId?: number | undefined | null;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetDeviceRegistrationTokenInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  containValue?: string | undefined;
}
