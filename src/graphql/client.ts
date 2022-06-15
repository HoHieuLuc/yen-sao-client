/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useMemo } from 'react';

import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import isEqual from 'lodash/isEqual';
import { AppProps } from 'next/app';
import appConfig from '../config';
import merge from 'deepmerge';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: `${appConfig.apiURL}/gql`, // Server URL (must be absolute)
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        }),
        cache: new InMemoryCache({
            // typePolicies is not required to use Apollo with Next.js - only for doing pagination.
            typePolicies: {
                Query: {
                    fields: {
                        sanPham: {
                            merge: true
                        },
                        camNang: {
                            merge: true
                        }
                    },
                },
            },
        }),
    });
}

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
    initialState?: InitialState | null
}

export function initializeApollo(
    { initialState }: IInitializeApollo = {
        initialState: null,
    }) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: AppProps['pageProps']
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: AppProps['pageProps']) {
    let state: InitialState | null;
    try {
        state = pageProps[APOLLO_STATE_PROP_NAME];
    } catch (error) {
        state = null;
    }

    const store = useMemo(() => initializeApollo({ initialState: state }), [
        state,
    ]);
    return store;
}