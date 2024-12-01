import Link from 'next/link';
import ProfileIcon from '@/components/icons/profile.svg';

const WtHeader = () => {
  return (
    <header className="flex items-center justify-between bg-blue-500 px-4 py-2">
      <Link href="/" className="text-3xl font-bold text-white">
        Weather
      </Link>
      <Link href="/profile">
        <ProfileIcon className="h-8 w-8 text-white" />
      </Link>
    </header>
  );
};

export default WtHeader;
