import { Client, ClientOptions, createClient } from 'graphql-ws';
import { urlGraphQLSubscriptions } from '../config/apollo';

interface SubscriptionClient extends Client {
  restart(): void;
}

const WS_RECONNECTION_TIMEOUT = 1000; // in milliseconds

const createSubscriptionClient = (options: ClientOptions): SubscriptionClient => {
  let restart = (): void => {
    console.warn('Restart is not implemented');
  };

  const client = createClient({
    ...options,
    on: {
      ...options.on,
      opened: (socket: any) => {
        options.on?.opened?.(socket);

        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205, 'Client Restart');
          }
        };
      },
    },
  });

  return {
    ...client,
    restart: () => restart(),
  };
};

let subscriptionClient: SubscriptionClient;

export const getSubscriptionClient = (): SubscriptionClient =>
  (subscriptionClient =
    subscriptionClient ||
    createSubscriptionClient({
      url: urlGraphQLSubscriptions as string,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      retryWait: async () => {
        const prom = new Promise((resolve) => {
          setTimeout(() => resolve(undefined), WS_RECONNECTION_TIMEOUT);
        });

        await prom;
      },
      connectionParams: async () => {
        return {
          // @ts-expect-error ddsd
          accessToken: window?.Telegram?.WebApp?.initData || 'empty',
        };
      },
    }));
