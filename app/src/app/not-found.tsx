import WtLinkButton from '@/components/WtLinkButton/WtLinkButton';

export default function NotFound() {
  return (
    <main className="mt-16 flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">404 | Page not found</h1>
      <WtLinkButton href="/">Go back to the home page</WtLinkButton>
    </main>
  );
}
