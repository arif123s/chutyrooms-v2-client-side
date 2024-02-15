import SearchField from "../Home/HomePage/SearchField/SearchField";

const SearchResultHotel = () => {
  return (
    <div>
      <SearchField></SearchField>

      <div className="filter-hotels-container">
        <div className="filter-container"></div>

        <div className="hotels-result-container"></div>
      </div>
    </div>
  );
};

export default SearchResultHotel;
