// import { NotificationPayload } from "firebase/messaging";
// import { NotificationPayload } from "firebase/messaging/dist/esm/messaging/index";

// export type PushNotification = Omit<NotificationPayload, 'icon' | 'image'>;
/**
 * Push notification
 */
import type { NotificationPayload } from '@firebase/messaging';
export type PushNotification = Omit<NotificationPayload, 'icon' | 'image'>;

