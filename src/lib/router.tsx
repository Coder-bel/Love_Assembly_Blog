import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutZonePage } from '@/pages/AboutZonePage';
import { AboutRCCGPage } from '@/pages/AboutRCCGPage';
import { LeadershipPage } from '@/pages/LeadershipPage';
import { ParishesPage } from '@/pages/ParishesPage';
import { SermonsPage } from '@/pages/SermonsPage';
import { SermonDetailPage } from '@/pages/SermonDetailPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { EventsPage } from '@/pages/EventsPage';
import { MinistriesPage } from '@/pages/MinistriesPage';
import { GivePage } from '@/pages/GivePage';
import { ContactPage } from '@/pages/ContactPage';
import { PrayerTestimoniesPage } from '@/pages/PrayerTestimoniesPage';
import { LiveStreamPage } from '@/pages/LiveStreamPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const rootRoute = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutZoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutZonePage,
});

const aboutRCCGRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-rccg',
  component: AboutRCCGPage,
});

const leadershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leadership',
  component: LeadershipPage,
});

const parishesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/parishes',
  component: ParishesPage,
});

const sermonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sermons',
  component: SermonsPage,
});

const sermonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sermons/$id',
  component: SermonDetailPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: EventsPage,
});

const ministriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ministries',
  component: MinistriesPage,
});

const giveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/give',
  component: GivePage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const prayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prayer',
  component: PrayerTestimoniesPage,
});

const liveStreamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/live',
  component: LiveStreamPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutZoneRoute,
  aboutRCCGRoute,
  leadershipRoute,
  parishesRoute,
  sermonsRoute,
  sermonDetailRoute,
  blogRoute,
  blogPostRoute,
  eventsRoute,
  ministriesRoute,
  giveRoute,
  contactRoute,
  prayerRoute,
  liveStreamRoute,
  notFoundRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
