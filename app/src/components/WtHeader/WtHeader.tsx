import Link from 'next/link';

const WtHeader = () => {
  return (
    <header className="bg-blue-500 px-4 py-2">
      <Link href="/" className="text-3xl font-bold text-white">
        Weather
      </Link>
    </header>
  );
};

export default WtHeader;
