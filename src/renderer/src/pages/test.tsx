import { Link } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';

function RouteComponent() {
  return (
    <div>
      <p>Hello "/test"!</p>
      <Link href='/' isBlock color='primary'>
        to home
      </Link>
    </div>
  );
}

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});
