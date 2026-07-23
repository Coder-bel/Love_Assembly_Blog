import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutZonePage } from '@/pages/AboutZonePage';
import { AboutRCCGPage } from '@/pages/AboutRCCGPage';
import { LeadershipPage } from '@/pages/LeadershipPage';
import { EventsPage } from '@/pages/EventsPage';
import { GivePage } from '@/pages/GivePage';
import { ContactPage } from '@/pages/ContactPage';
import { PrayerTestimoniesPage } from '@/pages/PrayerTestimoniesPage';
import { BlogPage } from '@/pages/BlogPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { LegendsPage } from '@/pages/LegendsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { YayaPage } from '@/pages/YayaPage';

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

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: EventsPage,
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

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/messages',
  component: MessagesPage,
});

const legendsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/legends',
  component: LegendsPage,
});

const yayaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/yaya',
  component: YayaPage,
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
  eventsRoute,
  giveRoute,
  contactRoute,
  prayerRoute,
  blogRoute,
  messagesRoute,
  legendsRoute,
  yayaRoute,
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
