import { Device } from '@capacitor/device';
import { PushNotifications } from '@capacitor/push-notifications';
import {PermissionState} from '@capacitor/core';

export async function checkPermissions(): Promise<CheckPermissionsResult> {
  const { platform } = await Device.getInfo();
  let permissionState: CheckPermissionsResult['permissionState'];
  if (platform === 'web') {
   permissionState = Notification.permission;
  } else {
    let permissionsStatus = await PushNotifications.checkPermissions();
    permissionState = permissionsStatus.receive;
  }

  return {permissionState}
}

export interface CheckPermissionsResult {
   permissionState: NotificationPermission|PermissionState;
}