import { Device } from "@capacitor/device";
import { PushNotifications } from "@capacitor/push-notifications";

/**
 * Requiests notification permissions
 * 
 * @example
```ts
await requestPermissions()
```
 */
export async function requestPermissions(): Promise<boolean>{
  const { platform } = await Device.getInfo();
  let isPermissionsGranted: boolean;
  if (platform === 'web') {
    const permissionsStatus = await Notification.requestPermission();
    isPermissionsGranted = permissionsStatus === 'granted';
  } else {
    const permissionsStatus =
      await PushNotifications.requestPermissions();
    isPermissionsGranted = permissionsStatus.receive === 'granted';
  }
  return isPermissionsGranted
}