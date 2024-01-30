import SearchField from "./SearchField/SearchField";

const HomePage = () => {
    return (
      <div className="min-h-screen">
        <SearchField></SearchField>
        <h2 className="text-5xl text-center text-green-700 font-bold text center mt-8">
          Hello Chutyrooms!!
        </h2>
      </div>
    );
};

export default HomePage;