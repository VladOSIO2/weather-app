import WtProfileFavoriteList from '../WtProfileFavoriteList/WtProfileFavoriteList';
import WtProfileHeader from '../WtProfileHeader/WtProfileHeader';

const WtProfileMain = () => {
  return (
    <main className="flex flex-col gap-4 p-4">
      <WtProfileHeader />
      <WtProfileFavoriteList />
    </main>
  );
};

export default WtProfileMain;
