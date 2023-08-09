
import {
  Package as BasePackage,
  PackageOptions as BasePackageOptions,
} from '@deep-foundation/deeplinks/imports/package.js';

/**
Represents a deep package

@remarks
Contains name of the package and all the links as the objects with id method which returns the id of the link.

@example
#### Use name field to get the name of the package
```ts
const package = new Package({deep});
const {name: packageName} = package;
```
#### Use id method to get the id of the link
```ts
const package = new Package({deep});
const pushNotificationNotifyInsertHandlerTypeLinkId = await package["PushNotificationNotifyInsertHandler"].id();
const typeOfValueOfPushNotificationBodyTypeLinkId = await package["TypeOfValueOfPushNotificationBody"].id();
const pushNotificationTitleTypeLinkId = await package["PushNotificationTitle"].id();
const typeOfValueOfPushNotificationTitleTypeLinkId = await package["TypeOfValueOfPushNotificationTitle"].id();
const notifyTypeLinkId = await package["Notify"].id();
const notifiedTypeLinkId = await package["Notified"].id();
const handlePushNotificationNotifyInsertTypeLinkId = await package["HandlePushNotificationNotifyInsert"].id();
const treeIncludeFromCurrentPushNotificationBodyTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationBody"].id();
const treeIncludeFromCurrentPushNotificationTitleTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationTitle"].id();
const treeIncludeNodePushNotificationTypeLinkId = await package["TreeIncludeNodePushNotification"].id();
const handleUpdateOfPushNotificationTypeLinkId = await package["HandleUpdateOfPushNotification"].id();
const serviceAccountTypeLinkId = await package["ServiceAccount"].id();
const typeOfValueOfServiceAccountTypeLinkId = await package["TypeOfValueOfServiceAccount"].id();
const usesServiceAccountTypeLinkId = await package["UsesServiceAccount"].id();
const pushNotificationTypeLinkId = await package["PushNotification"].id();
const pushNotificationBodyTypeLinkId = await package["PushNotificationBody"].id();
const typeOfValueOfPushNotificationTypeLinkId = await package["TypeOfValueOfPushNotification"].id();
const webPushCertificateTypeLinkId = await package["WebPushCertificate"].id();
const usesWebPushCertificateTypeLinkId = await package["UsesWebPushCertificate"].id();
const typeOfValueOfWebPushCertificateTypeLinkId = await package["TypeOfValueOfWebPushCertificate"].id();
const deviceRegistrationTokenTypeLinkId = await package["DeviceRegistrationToken"].id();
const pushNotificationNotifyInsertHandlerCodeTypeLinkId = await package["PushNotificationNotifyInsertHandlerCode"].id();
const pushNotificationTreeTypeLinkId = await package["PushNotificationTree"].id();
```

#### Use idLocal method to get the local id of the link
```ts
const package = new Package({deep});
await package.applyMinilinks();
const pushNotificationNotifyInsertHandlerTypeLinkId = package["PushNotificationNotifyInsertHandler"].idLocal();
const typeOfValueOfPushNotificationBodyTypeLinkId = package["TypeOfValueOfPushNotificationBody"].idLocal();
const pushNotificationTitleTypeLinkId = package["PushNotificationTitle"].idLocal();
const typeOfValueOfPushNotificationTitleTypeLinkId = package["TypeOfValueOfPushNotificationTitle"].idLocal();
const notifyTypeLinkId = package["Notify"].idLocal();
const notifiedTypeLinkId = package["Notified"].idLocal();
const handlePushNotificationNotifyInsertTypeLinkId = package["HandlePushNotificationNotifyInsert"].idLocal();
const treeIncludeFromCurrentPushNotificationBodyTypeLinkId = package["TreeIncludeFromCurrentPushNotificationBody"].idLocal();
const treeIncludeFromCurrentPushNotificationTitleTypeLinkId = package["TreeIncludeFromCurrentPushNotificationTitle"].idLocal();
const treeIncludeNodePushNotificationTypeLinkId = package["TreeIncludeNodePushNotification"].idLocal();
const handleUpdateOfPushNotificationTypeLinkId = package["HandleUpdateOfPushNotification"].idLocal();
const serviceAccountTypeLinkId = package["ServiceAccount"].idLocal();
const typeOfValueOfServiceAccountTypeLinkId = package["TypeOfValueOfServiceAccount"].idLocal();
const usesServiceAccountTypeLinkId = package["UsesServiceAccount"].idLocal();
const pushNotificationTypeLinkId = package["PushNotification"].idLocal();
const pushNotificationBodyTypeLinkId = package["PushNotificationBody"].idLocal();
const typeOfValueOfPushNotificationTypeLinkId = package["TypeOfValueOfPushNotification"].idLocal();
const webPushCertificateTypeLinkId = package["WebPushCertificate"].idLocal();
const usesWebPushCertificateTypeLinkId = package["UsesWebPushCertificate"].idLocal();
const typeOfValueOfWebPushCertificateTypeLinkId = package["TypeOfValueOfWebPushCertificate"].idLocal();
const deviceRegistrationTokenTypeLinkId = package["DeviceRegistrationToken"].idLocal();
const pushNotificationNotifyInsertHandlerCodeTypeLinkId = package["PushNotificationNotifyInsertHandlerCode"].idLocal();
const pushNotificationTreeTypeLinkId = package["PushNotificationTree"].idLocal();
```
#### Use name field to get the name of the link
```ts
const package = new Package({deep});
const pushNotificationNotifyInsertHandler = package["PushNotificationNotifyInsertHandler"].name;
const typeOfValueOfPushNotificationBody = package["TypeOfValueOfPushNotificationBody"].name;
const pushNotificationTitle = package["PushNotificationTitle"].name;
const typeOfValueOfPushNotificationTitle = package["TypeOfValueOfPushNotificationTitle"].name;
const notify = package["Notify"].name;
const notified = package["Notified"].name;
const handlePushNotificationNotifyInsert = package["HandlePushNotificationNotifyInsert"].name;
const treeIncludeFromCurrentPushNotificationBody = package["TreeIncludeFromCurrentPushNotificationBody"].name;
const treeIncludeFromCurrentPushNotificationTitle = package["TreeIncludeFromCurrentPushNotificationTitle"].name;
const treeIncludeNodePushNotification = package["TreeIncludeNodePushNotification"].name;
const handleUpdateOfPushNotification = package["HandleUpdateOfPushNotification"].name;
const serviceAccount = package["ServiceAccount"].name;
const typeOfValueOfServiceAccount = package["TypeOfValueOfServiceAccount"].name;
const usesServiceAccount = package["UsesServiceAccount"].name;
const pushNotification = package["PushNotification"].name;
const pushNotificationBody = package["PushNotificationBody"].name;
const typeOfValueOfPushNotification = package["TypeOfValueOfPushNotification"].name;
const webPushCertificate = package["WebPushCertificate"].name;
const usesWebPushCertificate = package["UsesWebPushCertificate"].name;
const typeOfValueOfWebPushCertificate = package["TypeOfValueOfWebPushCertificate"].name;
const deviceRegistrationToken = package["DeviceRegistrationToken"].name;
const pushNotificationNotifyInsertHandlerCode = package["PushNotificationNotifyInsertHandlerCode"].name;
const pushNotificationTree = package["PushNotificationTree"].name;
```
*/
export class Package extends BasePackage {

  constructor(param: PackageOptions) {
    super({
      ...param,
      name: '@deep-foundation/firebase-push-notification',
    });
  }


      /**
      @example
      #### Use id method to get the id of the PushNotificationNotifyInsertHandler link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandlerTypeLinkId = await package["PushNotificationNotifyInsertHandler"].id();
      ```
      #### Use localId method to get the local id of the PushNotificationNotifyInsertHandler link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandlerTypeLinkId = await package["PushNotificationNotifyInsertHandler"].localId();
      ```
      #### Use name field to get the name of the PushNotificationNotifyInsertHandler link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandler = await package["PushNotificationNotifyInsertHandler"].name;
      ```
      */
      public "PushNotificationNotifyInsertHandler" = this.createEntity("PushNotificationNotifyInsertHandler");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationBodyTypeLinkId = await package["TypeOfValueOfPushNotificationBody"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationBodyTypeLinkId = await package["TypeOfValueOfPushNotificationBody"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationBody = await package["TypeOfValueOfPushNotificationBody"].name;
      ```
      */
      public "TypeOfValueOfPushNotificationBody" = this.createEntity("TypeOfValueOfPushNotificationBody");
      /**
      @example
      #### Use id method to get the id of the PushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const pushNotificationTitleTypeLinkId = await package["PushNotificationTitle"].id();
      ```
      #### Use localId method to get the local id of the PushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const pushNotificationTitleTypeLinkId = await package["PushNotificationTitle"].localId();
      ```
      #### Use name field to get the name of the PushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const pushNotificationTitle = await package["PushNotificationTitle"].name;
      ```
      */
      public "PushNotificationTitle" = this.createEntity("PushNotificationTitle");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationTitleTypeLinkId = await package["TypeOfValueOfPushNotificationTitle"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationTitleTypeLinkId = await package["TypeOfValueOfPushNotificationTitle"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationTitle = await package["TypeOfValueOfPushNotificationTitle"].name;
      ```
      */
      public "TypeOfValueOfPushNotificationTitle" = this.createEntity("TypeOfValueOfPushNotificationTitle");
      /**
      @example
      #### Use id method to get the id of the Notify link
      ```ts
      const package = new Package({deep});
      const notifyTypeLinkId = await package["Notify"].id();
      ```
      #### Use localId method to get the local id of the Notify link
      ```ts
      const package = new Package({deep});
      const notifyTypeLinkId = await package["Notify"].localId();
      ```
      #### Use name field to get the name of the Notify link
      ```ts
      const package = new Package({deep});
      const notify = await package["Notify"].name;
      ```
      */
      public "Notify" = this.createEntity("Notify");
      /**
      @example
      #### Use id method to get the id of the Notified link
      ```ts
      const package = new Package({deep});
      const notifiedTypeLinkId = await package["Notified"].id();
      ```
      #### Use localId method to get the local id of the Notified link
      ```ts
      const package = new Package({deep});
      const notifiedTypeLinkId = await package["Notified"].localId();
      ```
      #### Use name field to get the name of the Notified link
      ```ts
      const package = new Package({deep});
      const notified = await package["Notified"].name;
      ```
      */
      public "Notified" = this.createEntity("Notified");
      /**
      @example
      #### Use id method to get the id of the HandlePushNotificationNotifyInsert link
      ```ts
      const package = new Package({deep});
      const handlePushNotificationNotifyInsertTypeLinkId = await package["HandlePushNotificationNotifyInsert"].id();
      ```
      #### Use localId method to get the local id of the HandlePushNotificationNotifyInsert link
      ```ts
      const package = new Package({deep});
      const handlePushNotificationNotifyInsertTypeLinkId = await package["HandlePushNotificationNotifyInsert"].localId();
      ```
      #### Use name field to get the name of the HandlePushNotificationNotifyInsert link
      ```ts
      const package = new Package({deep});
      const handlePushNotificationNotifyInsert = await package["HandlePushNotificationNotifyInsert"].name;
      ```
      */
      public "HandlePushNotificationNotifyInsert" = this.createEntity("HandlePushNotificationNotifyInsert");
      /**
      @example
      #### Use id method to get the id of the TreeIncludeFromCurrentPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationBodyTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationBody"].id();
      ```
      #### Use localId method to get the local id of the TreeIncludeFromCurrentPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationBodyTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationBody"].localId();
      ```
      #### Use name field to get the name of the TreeIncludeFromCurrentPushNotificationBody link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationBody = await package["TreeIncludeFromCurrentPushNotificationBody"].name;
      ```
      */
      public "TreeIncludeFromCurrentPushNotificationBody" = this.createEntity("TreeIncludeFromCurrentPushNotificationBody");
      /**
      @example
      #### Use id method to get the id of the TreeIncludeFromCurrentPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationTitleTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationTitle"].id();
      ```
      #### Use localId method to get the local id of the TreeIncludeFromCurrentPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationTitleTypeLinkId = await package["TreeIncludeFromCurrentPushNotificationTitle"].localId();
      ```
      #### Use name field to get the name of the TreeIncludeFromCurrentPushNotificationTitle link
      ```ts
      const package = new Package({deep});
      const treeIncludeFromCurrentPushNotificationTitle = await package["TreeIncludeFromCurrentPushNotificationTitle"].name;
      ```
      */
      public "TreeIncludeFromCurrentPushNotificationTitle" = this.createEntity("TreeIncludeFromCurrentPushNotificationTitle");
      /**
      @example
      #### Use id method to get the id of the TreeIncludeNodePushNotification link
      ```ts
      const package = new Package({deep});
      const treeIncludeNodePushNotificationTypeLinkId = await package["TreeIncludeNodePushNotification"].id();
      ```
      #### Use localId method to get the local id of the TreeIncludeNodePushNotification link
      ```ts
      const package = new Package({deep});
      const treeIncludeNodePushNotificationTypeLinkId = await package["TreeIncludeNodePushNotification"].localId();
      ```
      #### Use name field to get the name of the TreeIncludeNodePushNotification link
      ```ts
      const package = new Package({deep});
      const treeIncludeNodePushNotification = await package["TreeIncludeNodePushNotification"].name;
      ```
      */
      public "TreeIncludeNodePushNotification" = this.createEntity("TreeIncludeNodePushNotification");
      /**
      @example
      #### Use id method to get the id of the HandleUpdateOfPushNotification link
      ```ts
      const package = new Package({deep});
      const handleUpdateOfPushNotificationTypeLinkId = await package["HandleUpdateOfPushNotification"].id();
      ```
      #### Use localId method to get the local id of the HandleUpdateOfPushNotification link
      ```ts
      const package = new Package({deep});
      const handleUpdateOfPushNotificationTypeLinkId = await package["HandleUpdateOfPushNotification"].localId();
      ```
      #### Use name field to get the name of the HandleUpdateOfPushNotification link
      ```ts
      const package = new Package({deep});
      const handleUpdateOfPushNotification = await package["HandleUpdateOfPushNotification"].name;
      ```
      */
      public "HandleUpdateOfPushNotification" = this.createEntity("HandleUpdateOfPushNotification");
      /**
      @example
      #### Use id method to get the id of the ServiceAccount link
      ```ts
      const package = new Package({deep});
      const serviceAccountTypeLinkId = await package["ServiceAccount"].id();
      ```
      #### Use localId method to get the local id of the ServiceAccount link
      ```ts
      const package = new Package({deep});
      const serviceAccountTypeLinkId = await package["ServiceAccount"].localId();
      ```
      #### Use name field to get the name of the ServiceAccount link
      ```ts
      const package = new Package({deep});
      const serviceAccount = await package["ServiceAccount"].name;
      ```
      */
      public "ServiceAccount" = this.createEntity("ServiceAccount");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfServiceAccount link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfServiceAccountTypeLinkId = await package["TypeOfValueOfServiceAccount"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfServiceAccount link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfServiceAccountTypeLinkId = await package["TypeOfValueOfServiceAccount"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfServiceAccount link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfServiceAccount = await package["TypeOfValueOfServiceAccount"].name;
      ```
      */
      public "TypeOfValueOfServiceAccount" = this.createEntity("TypeOfValueOfServiceAccount");
      /**
      @example
      #### Use id method to get the id of the UsesServiceAccount link
      ```ts
      const package = new Package({deep});
      const usesServiceAccountTypeLinkId = await package["UsesServiceAccount"].id();
      ```
      #### Use localId method to get the local id of the UsesServiceAccount link
      ```ts
      const package = new Package({deep});
      const usesServiceAccountTypeLinkId = await package["UsesServiceAccount"].localId();
      ```
      #### Use name field to get the name of the UsesServiceAccount link
      ```ts
      const package = new Package({deep});
      const usesServiceAccount = await package["UsesServiceAccount"].name;
      ```
      */
      public "UsesServiceAccount" = this.createEntity("UsesServiceAccount");
      /**
      @example
      #### Use id method to get the id of the PushNotification link
      ```ts
      const package = new Package({deep});
      const pushNotificationTypeLinkId = await package["PushNotification"].id();
      ```
      #### Use localId method to get the local id of the PushNotification link
      ```ts
      const package = new Package({deep});
      const pushNotificationTypeLinkId = await package["PushNotification"].localId();
      ```
      #### Use name field to get the name of the PushNotification link
      ```ts
      const package = new Package({deep});
      const pushNotification = await package["PushNotification"].name;
      ```
      */
      public "PushNotification" = this.createEntity("PushNotification");
      /**
      @example
      #### Use id method to get the id of the PushNotificationBody link
      ```ts
      const package = new Package({deep});
      const pushNotificationBodyTypeLinkId = await package["PushNotificationBody"].id();
      ```
      #### Use localId method to get the local id of the PushNotificationBody link
      ```ts
      const package = new Package({deep});
      const pushNotificationBodyTypeLinkId = await package["PushNotificationBody"].localId();
      ```
      #### Use name field to get the name of the PushNotificationBody link
      ```ts
      const package = new Package({deep});
      const pushNotificationBody = await package["PushNotificationBody"].name;
      ```
      */
      public "PushNotificationBody" = this.createEntity("PushNotificationBody");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfPushNotification link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationTypeLinkId = await package["TypeOfValueOfPushNotification"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfPushNotification link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotificationTypeLinkId = await package["TypeOfValueOfPushNotification"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfPushNotification link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfPushNotification = await package["TypeOfValueOfPushNotification"].name;
      ```
      */
      public "TypeOfValueOfPushNotification" = this.createEntity("TypeOfValueOfPushNotification");
      /**
      @example
      #### Use id method to get the id of the WebPushCertificate link
      ```ts
      const package = new Package({deep});
      const webPushCertificateTypeLinkId = await package["WebPushCertificate"].id();
      ```
      #### Use localId method to get the local id of the WebPushCertificate link
      ```ts
      const package = new Package({deep});
      const webPushCertificateTypeLinkId = await package["WebPushCertificate"].localId();
      ```
      #### Use name field to get the name of the WebPushCertificate link
      ```ts
      const package = new Package({deep});
      const webPushCertificate = await package["WebPushCertificate"].name;
      ```
      */
      public "WebPushCertificate" = this.createEntity("WebPushCertificate");
      /**
      @example
      #### Use id method to get the id of the UsesWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const usesWebPushCertificateTypeLinkId = await package["UsesWebPushCertificate"].id();
      ```
      #### Use localId method to get the local id of the UsesWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const usesWebPushCertificateTypeLinkId = await package["UsesWebPushCertificate"].localId();
      ```
      #### Use name field to get the name of the UsesWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const usesWebPushCertificate = await package["UsesWebPushCertificate"].name;
      ```
      */
      public "UsesWebPushCertificate" = this.createEntity("UsesWebPushCertificate");
      /**
      @example
      #### Use id method to get the id of the TypeOfValueOfWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfWebPushCertificateTypeLinkId = await package["TypeOfValueOfWebPushCertificate"].id();
      ```
      #### Use localId method to get the local id of the TypeOfValueOfWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfWebPushCertificateTypeLinkId = await package["TypeOfValueOfWebPushCertificate"].localId();
      ```
      #### Use name field to get the name of the TypeOfValueOfWebPushCertificate link
      ```ts
      const package = new Package({deep});
      const typeOfValueOfWebPushCertificate = await package["TypeOfValueOfWebPushCertificate"].name;
      ```
      */
      public "TypeOfValueOfWebPushCertificate" = this.createEntity("TypeOfValueOfWebPushCertificate");
      /**
      @example
      #### Use id method to get the id of the DeviceRegistrationToken link
      ```ts
      const package = new Package({deep});
      const deviceRegistrationTokenTypeLinkId = await package["DeviceRegistrationToken"].id();
      ```
      #### Use localId method to get the local id of the DeviceRegistrationToken link
      ```ts
      const package = new Package({deep});
      const deviceRegistrationTokenTypeLinkId = await package["DeviceRegistrationToken"].localId();
      ```
      #### Use name field to get the name of the DeviceRegistrationToken link
      ```ts
      const package = new Package({deep});
      const deviceRegistrationToken = await package["DeviceRegistrationToken"].name;
      ```
      */
      public "DeviceRegistrationToken" = this.createEntity("DeviceRegistrationToken");
      /**
      @example
      #### Use id method to get the id of the PushNotificationNotifyInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandlerCodeTypeLinkId = await package["PushNotificationNotifyInsertHandlerCode"].id();
      ```
      #### Use localId method to get the local id of the PushNotificationNotifyInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandlerCodeTypeLinkId = await package["PushNotificationNotifyInsertHandlerCode"].localId();
      ```
      #### Use name field to get the name of the PushNotificationNotifyInsertHandlerCode link
      ```ts
      const package = new Package({deep});
      const pushNotificationNotifyInsertHandlerCode = await package["PushNotificationNotifyInsertHandlerCode"].name;
      ```
      */
      public "PushNotificationNotifyInsertHandlerCode" = this.createEntity("PushNotificationNotifyInsertHandlerCode");
      /**
      @example
      #### Use id method to get the id of the PushNotificationTree link
      ```ts
      const package = new Package({deep});
      const pushNotificationTreeTypeLinkId = await package["PushNotificationTree"].id();
      ```
      #### Use localId method to get the local id of the PushNotificationTree link
      ```ts
      const package = new Package({deep});
      const pushNotificationTreeTypeLinkId = await package["PushNotificationTree"].localId();
      ```
      #### Use name field to get the name of the PushNotificationTree link
      ```ts
      const package = new Package({deep});
      const pushNotificationTree = await package["PushNotificationTree"].name;
      ```
      */
      public "PushNotificationTree" = this.createEntity("PushNotificationTree");

}

export type PackageOptions = Omit<BasePackageOptions, 'name'>;
