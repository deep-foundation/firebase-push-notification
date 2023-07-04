import {
   DeepClient,
   SerialOperation,
 } from '@deep-foundation/deeplinks/imports/client';
 import { LinkName } from './link-name';
 import { PACKAGE_NAME } from './package-name';
 import { createSerialOperation } from '@deep-foundation/deeplinks/imports/gql';
import { MutationInputValue } from '@deep-foundation/deeplinks/imports/client_types';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
 
 /**
   * Gets serial operations to update {@link LinkName.WebPushCertificate}
   * 
   * @example
   * #### Update {@link LinkName.WebPushCertificate}
  ```ts
  const serialOperations = await getWebPushCertificateValueInsertSerialOperations({
    deep,
    webPushCertificate: {
      title,
      body,
    }
  });
  await deep.serial({
    operations: serialOperations
  })
  ```
   */
 export async function getWebPushCertificateValueInsertSerialOperations(
   param: GetWebPushCertificateValueUpdateSerialOperationsParam
 ): Promise<Array<SerialOperation>> {
   const { deep, webPushCertificate } = param;

   const webPushCertificateLink = await getWebPushCertificateLink();
 
   const serialOperations = await getSerialOperations({
     webPushCertificateLink,
     value: webPushCertificate,
   });

   return serialOperations;
 
   async function getWebPushCertificateLink() {
     let webPushCertificateLink: Link<number>;
 
     if ('webPushCertificateLinkId' in param) {
       if (!param.webPushCertificateLinkId) {
         throw new Error(`webPushCertificateLinkId is undefined`);
       }
       const { data } = await deep.select({
         id: param.webPushCertificateLinkId,
       });
       webPushCertificateLink = data[0];
     } else if ('webPushCertificateLink' in param) {
       if (!param.webPushCertificateLink) {
         throw new Error(`webPushCertificateLink is undefined`);
       }
       webPushCertificateLink = param.webPushCertificateLink;
     } else {
       throw new Error(`Either webPushCertificateLink or webPushCertificateLinkId must be passed`);
     }
 
     return webPushCertificateLink;
   }
 
   async function getValueInsertSerialOperation({
     webPushCertificateLink,
     value,
   }: {
     webPushCertificateLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     return createSerialOperation({
       table: 'strings',
       type: 'insert',
       objects: {
         link_id: webPushCertificateLink.id,
         value: value,
       },
     });
   }
 
   async function getValueUpdateSerialOperation({
     webPushCertificateLink,
     value,
   }: {
     webPushCertificateLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     return createSerialOperation({
       table: 'strings',
       type: 'update',
       exp: {
         link_id: webPushCertificateLink.id,
       },
       value: {
         value: value,
       },
     });
   }
 

   async function getSerialOperations({
     webPushCertificateLink,
     value,
   }: {
     webPushCertificateLink: Link<number>;
     value: MutationInputValue<string>['value'];
   }) {
     let serialOperations: Array<SerialOperation> = [];
     if (!webPushCertificateLink.value) {
       serialOperations.push(
         await getValueUpdateSerialOperation({
           webPushCertificateLink,
           value,
         })
       );
     } else {
       serialOperations.push(
         await getValueInsertSerialOperation({
           webPushCertificateLink,
           value,
         })
       );
     }
     return serialOperations;
   }
 }
 
 export type GetWebPushCertificateValueUpdateSerialOperationsParam = {
   /**
    * DeepClient
    */
   deep: DeepClient;
   /**
    * WebPushCertificate
    */
   webPushCertificate: string;
 } & (
   | { 
      /**
       * WebPushCertificate Link Id
       */
      webPushCertificateLinkId: number 
   }
   | { 
      /**
       * WebPushCertificate Link
       */
      webPushCertificateLink: Link<number> 
   }
 )
 