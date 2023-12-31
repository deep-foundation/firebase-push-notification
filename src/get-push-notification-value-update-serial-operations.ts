import {
   DeepClient,
   SerialOperation,
 } from '@deep-foundation/deeplinks/imports/client.js';
 import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql/index.js';
import { MutationInputValue } from '@deep-foundation/deeplinks/imports/client_types.js';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
import { PushNotification } from './push-notification.js';
 
 /**
   * Gets serial operations to update {@link Package.PushNotification}
   * 
   * @example
   * #### Update {@link Package.PushNotification}
  ```ts
  const {serialOperations, linkIds} = await getPushNotificationValueUpdateSerialOperations({
    deep,
    pushNotification: {
      title,
      body,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
   */
 export async function getPushNotificationValueUpdateSerialOperations(
   param: GetPushNotificationValueUpdateSerialOperationsParam
 ): Promise<Array<SerialOperation>> {
   const { deep, pushNotification } = param;

   const pushNotificationLink = await getPushNotificationLink();
 
   const value = await getValue({
     pushNotificationLink,
     data: pushNotification,
   });
 
   const serialOperations = await getSerialOperations({
     pushNotificationLink,
     value,
   });

   return serialOperations;
 
   async function getPushNotificationLink() {
     let pushNotificationLink: Link<number>;
 
     if ('pushNotificationLinkId' in param) {
       if (!param.pushNotificationLinkId) {
         throw new Error(`pushNotificationLinkId is undefined`);
       }
       const { data } = await deep.select({
         id: param.pushNotificationLinkId,
       });
       pushNotificationLink = data[0];
     } else if ('pushNotificationLink' in param) {
       if (!param.pushNotificationLink) {
         throw new Error(`pushNotificationLink is undefined`);
       }
       pushNotificationLink = param.pushNotificationLink;
     } else {
       throw new Error(`Either pushNotificationLink or pushNotificationLinkId must be passed`);
     }
 
     return pushNotificationLink;
   }
 
   async function getValueInsertSerialOperation({
     pushNotificationLink,
     value,
   }: {
     pushNotificationLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     return createSerialOperation({
       table: 'objects',
       type: 'insert',
       objects: {
         link_id: pushNotificationLink.id,
         value: value,
       },
     });
   }
 
   async function getValueUpdateSerialOperation({
     pushNotificationLink,
     value,
   }: {
     pushNotificationLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     return createSerialOperation({
       table: 'objects',
       type: 'update',
       exp: {
         link_id: pushNotificationLink.id,
       },
       value: {
         value: value,
       },
     });
   }
 
   async function getValue({
     pushNotificationLink,
     data,
   }: {
     pushNotificationLink: Link<number>;
     data: Partial<PushNotification> | undefined;
   }) {
     return {
       ...(pushNotificationLink.value?.value ?? {}),
       ...(data),
     } as MutationInputValue<object>['value'];
   }
 
   async function getSerialOperations({
     pushNotificationLink,
     value,
   }: {
     pushNotificationLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     let serialOperations: Array<SerialOperation> = [];
     if (!pushNotificationLink.value) {
       serialOperations.push(
         await getValueUpdateSerialOperation({
           pushNotificationLink,
           value,
         })
       );
     } else {
       serialOperations.push(
         await getValueInsertSerialOperation({
           pushNotificationLink,
           value,
         })
       );
     }
     return serialOperations;
   }
 }
 
 export type GetPushNotificationValueUpdateSerialOperationsParam = {
   /**
    * DeepClient
    */
   deep: DeepClient;
   /**
    * PushNotification
    */
   pushNotification: PushNotification;
 } & (
   | { 
      /**
       * PushNotification Link Id
       */
      pushNotificationLinkId: number 
   }
   | { 
      /**
       * PushNotification Link
       */
      pushNotificationLink: Link<number> 
   }
 )
 