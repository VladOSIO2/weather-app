import WtSearch from '../WtSearch/WtSearch';

const WtHeader = () => {
  return (
    <header className="bg-blue-500 px-4 py-2">
      <h1 className="text-3xl font-bold text-white">Weather</h1>
      <WtSearch />
    </header>
  );
};

export default WtHeader;
