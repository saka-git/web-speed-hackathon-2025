import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';

import { Document, prefetch } from '@wsh-2025/client/src/app/Document';
import { createStore } from '@wsh-2025/client/src/app/createStore';
import { prefetch as episodePagePrefetch } from '@wsh-2025/client/src/pages/episode/components/EpisodePage';
import { prefetch as homePagePrefetch } from '@wsh-2025/client/src/pages/home/components/HomePage';
import { prefetch as notFoundPagePrefetch } from '@wsh-2025/client/src/pages/not_found/components/NotFoundPage';
import { prefetch as programPagePrefetch } from '@wsh-2025/client/src/pages/program/components/ProgramPage';
import { prefetch as seriesPagePrefetch } from '@wsh-2025/client/src/pages/series/components/SeriesPage';
import { prefetch as timetablePagePrefetch } from '@wsh-2025/client/src/pages/timetable/components/TimetablePage';

const HomePage = lazy(() => import('../pages/home/components/HomePage'));
const EpisodePage = lazy(() => import('../pages/episode/components/EpisodePage'));
const ProgramPage = lazy(() => import('../pages/program/components/ProgramPage'));
const SeriesPage = lazy(() => import('../pages/series/components/SeriesPage'));
const TimetablePage = lazy(() => import('../pages/timetable/components/TimetablePage'));
const NotFoundPage = lazy(() => import('../pages/not_found/components/NotFoundPage'));

export function createRoutes(store: ReturnType<typeof createStore>): RouteObject[] {
  return [
    {
      children: [
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          ),
          index: true,
          async loader() {
            return await homePagePrefetch(store);
          },
        },
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EpisodePage />
            </Suspense>
          ),
          async loader({ params }) {
            return await episodePagePrefetch(store, params);
          },
          path: '/episodes/:episodeId',
        },
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProgramPage />
            </Suspense>
          ),
          async loader({ params }) {
            return await programPagePrefetch(store, params);
          },
          path: '/programs/:programId',
        },
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SeriesPage />
            </Suspense>
          ),
          async loader({ params }) {
            return await seriesPagePrefetch(store, params);
          },
          path: '/series/:seriesId',
        },
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <TimetablePage />
            </Suspense>
          ),
          async loader() {
            return await timetablePagePrefetch(store);
          },
          path: '/timetable',
        },
        {
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          ),
          async loader() {
            return await notFoundPagePrefetch(store);
          },
          path: '*',
        },
      ],
      Component: Document,
      async loader() {
        return await prefetch(store);
      },
    },
  ];
}
