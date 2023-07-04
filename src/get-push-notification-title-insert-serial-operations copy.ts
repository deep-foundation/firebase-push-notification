import {
  DeepClient,
  SerialOperation,
} from '@deep-foundation/deeplinks/imports/client';
import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { LinkName } from './link-name';
import { PACKAGE_NAME } from './package-name';

export async function getPushNotificationTitleInsertSerialOperations(
  param: GetPushNotificationTitleInsertSerialOperationsParam
): Promise<Array<SerialOperation>> {
  const serialOperations: Array<SerialOperation> = [];

  const { deep, linkIdOfContainer: containerLinkId, valueOfContain: containValue, title ,pushNotificationLinkId} = param;

  const reservedLinkIds = await getReservedLinkIds();
  const { pushNotificationTitleLinkId, containLinkId,toLinkId } = reservedLinkIds;

  const typeLinkIds = await getTypeLinkIds();
  const { linkIdOfPushNotificationTitleType: pushNotificationTitleTypeLinkId, linkIdOfContainType: containTypeLinkId,linkIdOfTo: toTypeLinkId } = typeLinkIds;

  const pushNotificationTitleInsertSerialOperation = createSerialOperation({
    type: 'insert',
    table: 'links',
    objects: {
      id: pushNotificationTitleLinkId,
      type_id: pushNotificationTitleTypeLinkId,
      from_id: pushNotificationLinkId,
      to_id: toLinkId,
    },
  });
  serialOperations.push(pushNotificationTitleInsertSerialOperation);

  if (containerLinkId !== null) {
    const containInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        type_id: containTypeLinkId,
        from_id: param.linkIdOfContainer || deep.linkId,
        to_id: pushNotificationTitleLinkId,
      },
    });
    serialOperations.push(containInsertSerialOperation);

    if (containValue !== undefined) {
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
  }

  return serialOperations;

  type GetReservedLinkIdsResult = Exclude<
    GetPushNotificationTitleInsertSerialOperationsParam['reservedLinkIds'],
    undefined
  >;

  async function getReservedLinkIds(): Promise<Required<GetReservedLinkIdsResult>> {
    let result: Required<GetReservedLinkIdsResult> = {
      containLinkId: 0,
      pushNotificationTitleLinkId: 0,
      toLinkId: 0,
    };
    const linksToReserveCount =
      Object.keys(result).length -
      Object.keys(param.reservedLinkIds || {}).length;
    const reservedLinkIds: number[] =
      linksToReserveCount > 0 ? await deep.reserve(linksToReserveCount) : [];
    result = {
      containLinkId:
        param.reservedLinkIds?.containLinkId ?? reservedLinkIds.pop()!,
      pushNotificationTitleLinkId:
        param.reservedLinkIds?.pushNotificationTitleLinkId ??
        reservedLinkIds.pop()!,
        toLinkId: param.reservedLinkIds?.toLinkId ?? reservedLinkIds.pop()!,
    };
    return result;
  }

  type GetTypeLinkIdsResult = Required<
    Exclude<
      GetPushNotificationTitleInsertSerialOperationsParam['typeLinkIds'],
      undefined
    >
  >;

  async function getTypeLinkIds(): Promise<Required<GetTypeLinkIdsResult>> {
    const result: Required<GetTypeLinkIdsResult> = {
      linkIdOfContainType:
        param.typeLinkIds?.linkIdOfContainType ||
        (await deep.id('@deep-foundation/core', 'Contain')),
      linkIdOfPushNotificationTitleType:
        param.typeLinkIds?.linkIdOfPushNotificationTitleType ||
        (await deep.id(PACKAGE_NAME, LinkName[LinkName.PushNotification])),
      linkIdOfTo:
        param.typeLinkIds?.linkIdOfTo ||
        (await deep.id('@deep-foundation/core', 'SyncTextFile')),
    };
    return result;
  }

  async function getToLinkInsertSerialOperations() : Promise<Array<SerialOperation>> {
    const serialOperations: Array<SerialOperation> = [];

    const linkInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'links',
      objects: {
        id: toLinkId,
        type_id: toTypeLinkId,
      }
    })
    serialOperations.push(linkInsertSerialOperation);

    const valueInsertSerialOperation = createSerialOperation({
      type: 'insert',
      table: 'strings',
      objects: {
        link_id: toLinkId,
        value: title,
      }
    })
    serialOperations.push(valueInsertSerialOperation);

    return serialOperations;
  }
}

export interface GetPushNotificationTitleInsertSerialOperationsParam {
  /**
   * A Deep Client instance
   */
  deep: DeepClient;
  /**
   * A title of push notification
   */
  title: string;
  /**
   * A link id of push notification
   */
  pushNotificationLinkId: number;
  reservedLinkIds?: {
    /**
     * A link id of push notification title
     */
    pushNotificationTitleLinkId?: number;
    /**
     * A link id of contain
     */
    containLinkId?: number;
    /**
     * A link id of to
     */
    toLinkId?: number;
  };
  typeLinkIds?: {
    /**
     * A link id of push notification title type
     *
     * @defaultValue
     * await deep.id("@deep-foundation/firebase-push-notification", "PushNotificationTitle")
     */
    linkIdOfPushNotificationTitleType?: number;
    /**
     * A link id of contain type
     *
     * @defaultValue
     * await deep.id("@deep-foundation/core", "Contain")
     */
    linkIdOfContainType?: number;
    /**
     * A type link id of to
     *
     * @defaultValue
     * await deep.id("@deep-foundation/core", "SyncTextFile")
     */
    linkIdOfTo?: number;
  };
  /**
   * Link id of the container
   *
   * @remarks
   * If it is null, contain link will not be created
   * @defaultValue {@link GetPushNotificationInsertSerialOperationsParam.deep.linkId} if not provided or undefined
   */
  linkIdOfContainer?: number | undefined | null;
  /**
   * Value of the contain link
   *
   * @remarks
   * If {@link GetPushNotificationInsertSerialOperationsParam.containerLinkId} is null, this will be ignored
   */
  valueOfContain?: string | undefined;
}
