import {
   DeepClient,
   SerialOperation,
 } from '@deep-foundation/deeplinks/imports/client.js';
 import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql/index.js';
import { MutationInputValue } from '@deep-foundation/deeplinks/imports/client_types.js';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
 
 /**
   * Gets serial operations to update {@link Package.ServiceAccount}
   * 
   * @example
   * #### Update {@link Package.ServiceAccount}
  ```ts
  const {serialOperations, linkIds} = await getServiceAccountValueUpdateSerialOperations({
    deep,
    serviceAccount: {
      title,
      body,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
   */
 export async function getServiceAccountValueUpdateSerialOperations(
   param: GetServiceAccountValueUpdateSerialOperationsParam
 ): Promise<Array<SerialOperation>> {
   const { deep, serviceAccount } = param;

   const serviceAccountLink = await getServiceAccountLink();
 
   const serialOperations = await getSerialOperations({
     serviceAccountLink,
     value: serviceAccount,
   });

   return serialOperations;
 
   async function getServiceAccountLink() {
     let serviceAccountLink: Link<number>;
 
     if ('serviceAccountLinkId' in param) {
       if (!param.serviceAccountLinkId) {
         throw new Error(`serviceAccountLinkId is undefined`);
       }
       const { data } = await deep.select({
         id: param.serviceAccountLinkId,
       });
       serviceAccountLink = data[0];
     } else if ('serviceAccountLink' in param) {
       if (!param.serviceAccountLink) {
         throw new Error(`serviceAccountLink is undefined`);
       }
       serviceAccountLink = param.serviceAccountLink;
     } else {
       throw new Error(`Either serviceAccountLink or serviceAccountLinkId must be passed`);
     }
 
     return serviceAccountLink;
   }
 
   async function getValueInsertSerialOperation({
     serviceAccountLink,
     value,
   }: {
     serviceAccountLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     return createSerialOperation({
       table: 'objects',
       type: 'insert',
       objects: {
         link_id: serviceAccountLink.id,
         value: value,
       },
     });
   }
 
   async function getValueUpdateSerialOperation({
     serviceAccountLink,
     value,
   }: {
     serviceAccountLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     return createSerialOperation({
       table: 'objects',
       type: 'update',
       exp: {
         link_id: serviceAccountLink.id,
       },
       value: {
         value: value,
       },
     });
   }
 

   async function getSerialOperations({
     serviceAccountLink,
     value,
   }: {
     serviceAccountLink: Link<number>;
     value: MutationInputValue<object>['value'];
   }) {
     let serialOperations: Array<SerialOperation> = [];
     if (!serviceAccountLink.value) {
       serialOperations.push(
         await getValueUpdateSerialOperation({
           serviceAccountLink,
           value,
         })
       );
     } else {
       serialOperations.push(
         await getValueInsertSerialOperation({
           serviceAccountLink,
           value,
         })
       );
     }
     return serialOperations;
   }
 }
 
 export type GetServiceAccountValueUpdateSerialOperationsParam = {
   /**
    * DeepClient
    */
   deep: DeepClient;
   /**
    * Service Account
    */
   serviceAccount: object;
 } & (
   | { 
      /**
       * ServiceAccount Link Id
       */
      serviceAccountLinkId: number 
   }
   | { 
      /**
       * ServiceAccount Link
       */
      serviceAccountLink: Link<number> 
   }
 )
 