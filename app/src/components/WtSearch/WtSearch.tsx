import SearchIcon from '../icons/search.svg';

const WtSearch = () => {
  return (
    <div>
      <form action="/" className="flex flex-row">
        <input
          id="searchInput"
          type="text"
          name="search"
          placeholder="Address, city or zip code"
          className="w-full rounded-l-md p-1 pl-2 text-lg text-blue-950"
        />
        <button type="submit" className="rounded-r-md border-l-2 bg-white px-2">
          <SearchIcon className="h-6 w-6 text-blue-950" />
        </button>
      </form>
    </div>
  );
};

export default WtSearch;
