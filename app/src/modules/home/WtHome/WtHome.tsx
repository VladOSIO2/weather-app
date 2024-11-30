import Link from 'next/link';
import WtCitySearch from '../WtCitySearch/WtCitySearch';
import WtHomeWeatherResult from '../WtHomeWeatherResult/WtHomeWeatherResult';

const WtHome = () => {
  return (
    <div className="p-4">
      <WtCitySearch />
      <Link href="/favorites">Favorites</Link>
      <WtHomeWeatherResult />
    </div>
  );
};

export default WtHome;
