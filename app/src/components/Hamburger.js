const Hamburger = ({ onClick }) => {
  return (
    <div
      className="flex flex-col justify-between items-center w-8 h-6 cursor-pointer z-10"
      onClick={onClick}
    >
      <div className="w-8 h-1 bg-black rounded-full transition-all duration-300 transform burger1" />
      <div className="w-8 h-1 bg-black rounded-full transition-all duration-300 transform burger2" />
      <div className="w-8 h-1 bg-black rounded-full transition-all duration-300 transform burger3" />
    </div>
  );
};

export default Hamburger;
