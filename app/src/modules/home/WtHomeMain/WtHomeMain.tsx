import WtCitySearch from '../WtCitySearch/WtCitySearch';
import WtHomeWeatherResult from '../WtHomeWeatherResult/WtHomeWeatherResult';

const WtHomeMain = () => {
  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <WtCitySearch />
      <WtHomeWeatherResult />
    </main>
  );
};

export default WtHomeMain;
