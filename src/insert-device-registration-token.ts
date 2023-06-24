import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME } from "./package-name";
import { FirebasePushNotificationContains } from "./contains";

/**
 * Inserts device registration token
 * 
 * @remarks
 * Device registration token will be contained in device
 */
export async function insertDeviceRegistrationToken({
  deep, deviceRegistrationToken, deviceLinkId
}: InsertDeviceRegistrationTokenParam): Promise<{ deviceRegistrationTokenLinkId: number }> {
  const deviceRegistrationTokenTypeLinkId = await deep.id(
    FIREBASE_PUSH_NOTIFICATION_PACKAGE_NAME,
    FirebasePushNotificationContains[FirebasePushNotificationContains.DeviceRegistrationToken]
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