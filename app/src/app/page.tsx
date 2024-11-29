import WtHome from '@/modules/home/WtHome/WtHome';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <WtHome />
        </Suspense>
      </main>
    </div>
  );
}
