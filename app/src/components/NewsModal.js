const NewsModal = ({ isVisible, claim, position }) => {
  if (!isVisible || !position) return null;

  const { top, left } = position;

  return (
    <div
      className="absolute z-40 bg-white shadow-lg p-4 rounded-lg"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: "translate(-300%, -110%)",
      }}
    >
      <p className="text-black">{claim}</p>
    </div>
  );
};

export default NewsModal;
