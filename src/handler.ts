import {
  DeepClient,
  SerialOperation,
  Table,
} from '@deep-foundation/deeplinks/imports/client';
import { Link } from '@deep-foundation/deeplinks/imports/minilinks';
import * as FirebaseAdmin from 'firebase-admin';

async ({
  deep,
  data: { newLink: notifyLink, triggeredByLinkId },
}: {
  deep: DeepClient;
  data: { newLink: Link<number>, triggeredByLinkId: number };
}) => {
  const {default: firebaseAdmin} = await import('firebase-admin');
  const util = await import('util');
  const { createSerialOperation } = await import('@deep-foundation/deeplinks/imports/gql/index.js')
  const logs: Array<any> = [];
  const DEFAULT_LOG_DEPTH = 3;

  try {
    const result = await main();
    return {
      result,
      logs
    }
  } catch (error) {
    return {
      error,
      logs
    }
  }

  async function main() {
    const log = getNamespacedLogger({ namespace: main.name });
    log({notifyLink})
    const notificationLinkId = notifyLink.from_id!;
    log({ notificationLinkId })
    const { data: [notificationLink] } = await deep.select(notificationLinkId)
    log({ notificationLink })
    if (!notificationLink.value?.value) {
      throw new Error(`##${notificationLinkId} must have value`)
    }
    const title = notificationLink.value.value.title;
    log({ title })
    if (!title) {
      throw new Error(`Object value of ##${notificationLinkId} must have title property`)
    }

    const body = notificationLink.value.value.body;
    log({ body })
    if (!body) {
      throw new Error(`Object value of ##${notificationLinkId} must have body property`)
    }

    const deviceLinkId = notifyLink.to_id!;
    log({ deviceLinkId })

    const containTypeLinkId = await deep.id('@deep-foundation/core', 'Contain');
    log({ containTypeLinkId })

    const serviceAccount = await getServiceAccount({
      containTypeLinkId,
      triggeredByLinkId,
    });
    log({ serviceAccount })

    const firebaseApplication = await getFirebaseApplication({
      firebaseAdmin,
      serviceAccount,
    });
    log({ firebaseApplication })

    const deviceRegistrationToken = await getDeviceRegistrationToken({
      containTypeLinkId,
      deviceLinkId,
    });
    log({ deviceRegistrationToken })

    const pushNotificationData = {
      token: deviceRegistrationToken,
      notification: {
        title: title,
        body: body,
      },
    };
    log({ pushNotificationData })

    await firebaseAdmin.messaging(firebaseApplication).send(pushNotificationData);
    await deep.insert({
      type_id: await deep.id(deep.linkId!, 'Notified'),
      in: {
        data: {
          type_id: containTypeLinkId,
          from_id: triggeredByLinkId,
        },
      },
      from_id: notifyLink.id,
      to_id: deviceLinkId,
    });

    firebaseApplication.delete();
  }

  async function getServiceAccount({ containTypeLinkId, triggeredByLinkId }: {containTypeLinkId: number, triggeredByLinkId: number}) {
    const log = getNamespacedLogger({ namespace: getServiceAccount.name });
    const serviceAccountTypeLinkId = await deep.id(
      deep.linkId!,
      'ServiceAccount'
    );
    log({ serviceAccountTypeLinkId })
    const usesServiceAccountTypeLinkId = await deep.id(
      deep.linkId!,
      'UsesServiceAccount'
    );
    log({ usesServiceAccountTypeLinkId })
    const selectData = {
      _or: [
        {
          type_id: serviceAccountTypeLinkId,
          in: {
            type_id: containTypeLinkId,
            from_id: triggeredByLinkId,
          },
        },
        {
          type_id: usesServiceAccountTypeLinkId,
          from_id: triggeredByLinkId,
        },
      ],
    };
    const { data } = await deep.select(selectData);
    log({ data })
    if (data.length === 0) {
      throw new Error(
        `Select with data ${JSON.stringify(selectData)} returned empty result`
      );
    }
    let serviceAccountLink;
    const usesServiceAccountLinks = data.filter(
      (link) => link.type_id === usesServiceAccountTypeLinkId
    );
    if (usesServiceAccountLinks.length > 1) {
      throw new Error(
        `There must be only one link of type ${usesServiceAccountTypeLinkId} and from ${triggeredByLinkId}, instead there are ${usesServiceAccountLinks
          .map((link) => `##${link.id}`)
          .join(', ')}`
      );
    } else if (usesServiceAccountLinks.length === 1) {
      const usesServiceAccountLink = usesServiceAccountLinks[0];
      serviceAccountLink = data.find(
        (link) => link.id === usesServiceAccountLink.to_id
      );
    } else if (usesServiceAccountLinks.length === 0) {
      const serviceAccountLinks = data.filter(
        (link) => link.type_id === serviceAccountTypeLinkId
      );
      if (serviceAccountLinks.length > 1) {
        throw new Error(
          `There must be only one link of type ##${serviceAccountTypeLinkId} and contained by ##${triggeredByLinkId}, instead there are ${serviceAccountLinks
            .map((link) => `##${link.id}`)
            .join(', ')}`
        );
      } else if (serviceAccountLinks.length === 1) {
        serviceAccountLink = serviceAccountLinks[0];
      } else if (serviceAccountLinks.length === 0) {
        throw new Error(
          `A link of type ##${serviceAccountTypeLinkId} and contained by ##${triggeredByLinkId} is not found`
        );
      }
    }
    log({ serviceAccountLink })
    if (!serviceAccountLink) {
      throw new Error(
        `A link of type ##${usesServiceAccountTypeLinkId} and from ##${triggeredByLinkId} is not found`
      );
    }
    if (!serviceAccountLink.value?.value) {
      throw new Error(`##${serviceAccountLink.id} must have value`);
    }
    const result = serviceAccountLink.value.value;
    log({ result })
    return result;
  }

  async function getDeviceRegistrationToken({
    containTypeLinkId,
    deviceLinkId,
  }: {
    containTypeLinkId: number;
    deviceLinkId: number;
  }) {
    const log = getNamespacedLogger({ namespace: getDeviceRegistrationToken.name });
    const deviceRegistrationTokenTypeLinkId = await deep.id(
      deep.linkId!,
      'DeviceRegistrationToken'
    );
    log({ deviceRegistrationTokenTypeLinkId })
    const selectData = {
      type_id: deviceRegistrationTokenTypeLinkId,
      in: {
        type_id: containTypeLinkId,
        from_id: deviceLinkId,
      },
    };
    log({ selectData })
    const {
      data: [deviceRegistrationTokenLink],
    } = await deep.select(selectData);
    if (!deviceRegistrationTokenLink) {
      throw new Error(
        `##${deviceLinkId} must have contained a link of type ##${deviceRegistrationTokenTypeLinkId}. Select with data ${JSON.stringify(
          selectData
        )} returned empty result`
      );
    }
    log({ deviceRegistrationTokenLink })
    if (!deviceRegistrationTokenLink.value?.value) {
      throw new Error(`##${deviceRegistrationTokenLink.id} must have value`);
    }
    const result = deviceRegistrationTokenLink.value.value;
    log({ result })
    return result;
  }

  async function getFirebaseApplication(options: {
    firebaseAdmin: typeof FirebaseAdmin,
    serviceAccount: FirebaseAdmin.ServiceAccount,
  }): Promise<FirebaseAdmin.app.App> {
    const log = getNamespacedLogger({ namespace: getFirebaseApplication.name });
    log({ options })
    const {
      firebaseAdmin,
      serviceAccount,
    } = options;
    firebaseAdmin.apps.forEach((app) => app?.delete());
    return firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  }


  function getNamespacedLogger({
    namespace,
    depth = DEFAULT_LOG_DEPTH,
  }: {
    namespace: string;
    depth?: number;
  }) {
    return function (content: any) {
      const message = util.inspect(content, { depth });
      logs.push(`${namespace}: ${message}`);
    };
  }
};
