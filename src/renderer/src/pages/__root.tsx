import { HeroUIProvider } from '@heroui/react';
import { Outlet, createRootRoute, useRouter, type NavigateOptions, type ToOptions } from '@tanstack/react-router';

declare module '@react-types/shared' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const RootComponent = () => {
  const router = useRouter();

  return (
    <HeroUIProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={to => router.buildLocation({ to }).href}
    >
      <Outlet />
    </HeroUIProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
