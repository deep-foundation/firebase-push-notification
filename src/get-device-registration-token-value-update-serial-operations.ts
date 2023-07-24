import {
   DeepClient,
   SerialOperation,
 } from '@deep-foundation/deeplinks/imports/client';
 import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { MutationInputValue } from '@deep-foundation/deeplinks/imports/client_types';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
 
 /**
   * Gets serial operations to update {@link Package.DeviceRegistrationToken}
   * 
   * @example
   * #### Update {@link Package.DeviceRegistrationToken}
  ```ts
  const {serialOperations, linkIds} = await getDeviceRegistrationTokenValueUpdateSerialOperations({
    deep,
    deviceRegistrationToken: {
      title,
      body,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
   */
 export async function getDeviceRegistrationTokenValueUpdateSerialOperations(
   param: GetDeviceRegistrationTokenValueUpdateSerialOperationsParam
 ): Promise<Array<SerialOperation>> {
   const { deep, deviceRegistrationToken } = param;

   const deviceRegistrationTokenLink = await getDeviceRegistrationTokenLink();
 
   const serialOperations = await getSerialOperations({
     deviceRegistrationTokenLink,
     value: deviceRegistrationToken,
   });

   return serialOperations;
 
   async function getDeviceRegistrationTokenLink() {
     let deviceRegistrationTokenLink: Link<number>;
 
     if ('deviceRegistrationTokenLinkId' in param) {
       if (!param.deviceRegistrationTokenLinkId) {
         throw new Error(`deviceRegistrationTokenLinkId is undefined`);
       }
       const { data } = await deep.select({
         id: param.deviceRegistrationTokenLinkId,
       });
       deviceRegistrationTokenLink = data[0];
     } else if ('deviceRegistrationTokenLink' in param) {
       if (!param.deviceRegistrationTokenLink) {
         throw new Error(`deviceRegistrationTokenLink is undefined`);
       }
       deviceRegistrationTokenLink = param.deviceRegistrationTokenLink;
     } else {
       throw new Error(`Either deviceRegistrationTokenLink or deviceRegistrationTokenLinkId must be passed`);
     }
 
     return deviceRegistrationTokenLink;
   }
 
   async function getValueInsertSerialOperation({
     deviceRegistrationTokenLink,
     value,
   }: {
     deviceRegistrationTokenLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     return createSerialOperation({
       table: 'strings',
       type: 'insert',
       objects: {
         link_id: deviceRegistrationTokenLink.id,
         value: value,
       },
     });
   }
 
   async function getValueUpdateSerialOperation({
     deviceRegistrationTokenLink,
     value,
   }: {
     deviceRegistrationTokenLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     return createSerialOperation({
       table: 'strings',
       type: 'update',
       exp: {
         link_id: deviceRegistrationTokenLink.id,
       },
       value: {
         value: value,
       },
     });
   }
 

   async function getSerialOperations({
     deviceRegistrationTokenLink,
     value,
   }: {
     deviceRegistrationTokenLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     let serialOperations: Array<SerialOperation> = [];
     if (!deviceRegistrationTokenLink.value) {
       serialOperations.push(
         await getValueUpdateSerialOperation({
           deviceRegistrationTokenLink,
           value,
         })
       );
     } else {
       serialOperations.push(
         await getValueInsertSerialOperation({
           deviceRegistrationTokenLink,
           value,
         })
       );
     }
     return serialOperations;
   }
 }
 
 export type GetDeviceRegistrationTokenValueUpdateSerialOperationsParam = {
   /**
    * DeepClient
    */
   deep: DeepClient;
   /**
    * DeviceRegistrationToken
    */
   deviceRegistrationToken: string;
 } & (
   | { 
      /**
       * DeviceRegistrationToken Link Id
       */
      deviceRegistrationTokenLinkId: number 
   }
   | { 
      /**
       * DeviceRegistrationToken Link
       */
      deviceRegistrationTokenLink: Link<number> 
   }
 )
 