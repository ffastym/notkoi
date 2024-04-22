import { ApolloLink, createHttpLink, fromPromise, Operation, split, useApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
// @ts-expect-error sddddd
import { createUploadLink } from 'apollo-upload-client';
import { useCallback, useMemo, useRef } from 'react';
import { authorization, urlGraphQLServer } from '../config/apollo';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getSubscriptionClient } from './subscriptionClient';

// eslint-disable-next-line no-unused-vars
type ResolveFunction = (value: any) => void;

const isFile = (value: any) => {
  return value instanceof File;
};

const isUpload = ({ variables }: { variables: any }) => Object.values(variables).some(isFile);

const isSubscriptionOperation = ({ query }: { query: any }) => {
  // @ts-expect-error sss
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
};

const parseHeaders = (rawHeaders: any) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
    const parts = line.split(':');
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
};

export const uploadFetch = (url: string, options: any) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const opts: any = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
      };
      opts.url = 'responseURL' in xhr ? xhr.responseURL : opts.headers.get('X-Request-URL');
      const body = 'response' in xhr ? xhr.response : (xhr as any).responseText;
      resolve(new Response(body, opts));
    };
    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.ontimeout = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.open(options.method, url, true);

    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = options.onProgress;
    }

    options.onAbortPossible(() => {
      xhr.abort();
    });

    xhr.send(options.body);
  });

const customFetch = (uri: any, options: any) => {
  if (options.useUpload) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};

export function useApollo() {
  const isInitialized = useRef(false);
  //const { accessToken, refreshToken, logout, login } = useContext(AuthContext);
  const client = useApolloClient();
  //const [refresh] = useRefreshTokenMutation();
  const pendingRequests = useRef<ResolveFunction[]>([]);
  const isTokenUpdated = useRef(false);

  const httpLink = useMemo(
    () =>
      createHttpLink({
        uri: ({ operationName }) => `${urlGraphQLServer}?o=${operationName}`,
      }),
    [],
  );

  const uploadLink = useMemo(
    () =>
      createUploadLink({
        uri: ({ operationName }: any) => `${urlGraphQLServer}?oUpload=${operationName}`,
        fetch: customFetch as any,
      }),
    [],
  );

  const wsLink = useMemo(() => new GraphQLWsLink(getSubscriptionClient()), []);

  const requestLink = useMemo(() => split(isSubscriptionOperation, wsLink, httpLink), [httpLink, wsLink]);

  const terminalLink = useMemo(
    () => split(isUpload, uploadLink as unknown as ApolloLink, requestLink),
    [requestLink, uploadLink],
  );

  const resolvePendingRequests = (token: any) => {
    pendingRequests.current.map((callback) => callback(token));
    pendingRequests.current = [];
  };

  const updateOperationWithToken = useCallback((data: any, operation: Operation) => {
    const oldHeaders = operation.getContext().headers;
    const authorization = window.Telegram.WebApp.initData;

    operation.setContext({
      headers: {
        ...oldHeaders,
        authorization,
      },
    });

    if (!authorization) {
      throw new Error('error access token');
    }
  }, []);

  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError, forward, operation }) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            switch (err.extensions?.code) {
              case 'UNAUTHENTICATED':
                console.log('UNAUTHENTICATED');

                if (!window.Telegram.WebApp.initData) {
                  console.error('Missed initData');
                  return;
                }

                if (isTokenUpdated.current) {
                  return fromPromise(
                    new Promise((resolve) => {
                      pendingRequests.current.push(resolve);
                    }),
                  ).flatMap((data: any) => {
                    updateOperationWithToken(data, operation);

                    return forward(operation);
                  });
                }

                isTokenUpdated.current = true;

                return fromPromise(
                  new Promise((resolve) => resolve(true))
                    .catch((e) => {
                      console.error(`useApollo error: ${e.message}`);
                    })
                    .finally(() => {
                      isTokenUpdated.current = false;
                    }),
                )
                  .filter((value) => Boolean(value))
                  .flatMap(({ data }: any) => {
                    updateOperationWithToken(data, operation);
                    resolvePendingRequests(data);

                    return forward(operation);
                  });
            }
          }
        }

        if (networkError) {
          console.error(JSON.parse(JSON.stringify(networkError, null, 2)));
        }
      }),
    [updateOperationWithToken],
  );

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        const newHeaders = headers ? { ...headers } : { authorization };

        return {
          headers: newHeaders,
        };
      }),
    [],
  );

  const setLinks = useCallback(() => {
    client.setLink(ApolloLink.from([errorLink, authLink, terminalLink]));
  }, [authLink, client, errorLink, terminalLink]);

  if (!isInitialized.current) {
    setLinks();
  }
}
