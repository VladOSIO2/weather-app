import WtCitySearch from '../WtCitySearch/WtCitySearch';
import WtHomeWeatherResult from '../WtHomeWeatherResult/WtHomeWeatherResult';

const WtHome = () => {
  return (
    <div className="p-4">
      <WtCitySearch />
      <WtHomeWeatherResult />
    </div>
  );
};

export default WtHome;
