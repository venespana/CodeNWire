import { createFileRoute } from '@tanstack/react-router';

import Doctor from '@renderer/features/doctor';

function RouteComponent() {
  return (
    <>
      <h1 className='text-3xl font-bold mb-5'>CodeNWire</h1>
      <Doctor />
    </>
  );
}

export const Route = createFileRoute('/_home/')({
  component: RouteComponent,
});
