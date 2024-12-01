import WtProfileFavoriteList from '../WtProfileFavoriteList/WtProfileFavoriteList';
import WtProfileWelcome from '../WtProfileWelcome/WtProfileWelcome';

const WtProfileMain = () => {
  return (
    <main className="flex flex-col gap-4 p-4">
      <WtProfileWelcome />
      <WtProfileFavoriteList />
    </main>
  );
};

export default WtProfileMain;
