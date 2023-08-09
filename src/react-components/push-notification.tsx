import { Card, CardHeader, Heading, CardBody, Text } from "@chakra-ui/react";
import { PushNotification } from "../push-notification";

/**
 * A React component that displays a PushNotification's information in a card format.
 * 
 * @returns A `Card` component containing PushNotification model as a `Heading` in the `CardHeader` and PushNotification name as a `Text` in the `CardBody`.
 */
export function PushNotification(param: PushNotificationOptions) {
  const {PushNotification} = param;
  return <Card>
    <CardHeader>
      <Heading>
        {
          PushNotification.title
        }
      </Heading>
    </CardHeader>
    <CardBody>
      <Text>
        {
          PushNotification.body
        }
      </Text>
    </CardBody>
  </Card>
}

export interface PushNotificationOptions { 
  /**
   * All PushNotification information
   */
  PushNotification: PushNotification
 }
