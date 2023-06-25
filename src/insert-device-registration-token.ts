import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";
import { LinkName } from "./contains";

/**
 * Inserts device registration token
 * 
 * @remarks
 * Device registration token will be contained in device
 * 
 * @example
```ts
const { deviceRegistrationTokenLinkId } = await insertDeviceRegistrationToken({
  deep,
  deviceRegistrationToken,
  deviceLinkId,
})
```
 */
export async function insertDeviceRegistrationToken({
  deep, deviceRegistrationToken, deviceLinkId
}: InsertDeviceRegistrationTokenParam): Promise<InsertDeviceRegistrationTokenResult> {
  const deviceRegistrationTokenTypeLinkId = await deep.id(
    PACKAGE_NAME,
    LinkName[LinkName.DeviceRegistrationToken]
  );
  const containTypeLinkId = await deep.id(
    '@deep-foundation/core',
    'Contain'
  );

  const {
    data: [{ id: deviceRegistrationTokenLinkId }],
  } = await deep.insert({
    type_id: deviceRegistrationTokenTypeLinkId,
    string: {
      data: {
        value: deviceRegistrationToken,
      },
    },
    in: {
      data: [{
        type_id: containTypeLinkId,
        from_id: deviceLinkId,
      },
      ],
    },
  });
  return { deviceRegistrationTokenLinkId };

};

export interface InsertDeviceRegistrationTokenParam {
  /**
   * Deep Client
   */
  deep: DeepClient;
  /**
   * Device registration token
   */
  deviceRegistrationToken: string;
  /**
   * Device link id
   */
  deviceLinkId: number;
}

export interface InsertDeviceRegistrationTokenResult { 
  /**
   * Device registration token link id
   */
  deviceRegistrationTokenLinkId: number
 }