const GameWelcome = ({ setGameCategory }) => {
  const handleCategorySelect = (selectedCategory) => {
    setGameCategory(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-40 mb-20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weed Out
        </h1>

        <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Choose a category
        </h3>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleCategorySelect("Politics")}
            className="bg-green-blue hover:bg-dark-green-blue text-white py-3 px-6 rounded-md font-semibold focus:outline-none"
          >
            Politics
          </button>

          <button
            onClick={() => handleCategorySelect("Science")}
            className="bg-green-blue hover:bg-dark-green-blue text-white py-3 px-6 rounded-md font-semibold focus:outline-none"
          >
            Science
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameWelcome;
