import { Link } from '@heroui/react';
import { createFileRoute } from '@tanstack/react-router';

function RouteComponent() {
  return (
    <div>
      <p>Hello "/"!</p>
      <Link href='/test'>to test</Link>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
});
