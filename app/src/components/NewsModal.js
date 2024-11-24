const NewsModal = ({ isVisible, claim, position }) => {
  if (!isVisible || !position) return null;

  const { top, left, width } = position; 

  return (
    <div
      className="absolute z-40 bg-white shadow-lg p-4 rounded-lg"
      style={{
        top: `${top - 200}px`, 
        left: `${left + width / 2 - 150}px`, 
        transform: "translate(-50%, 0)", 
        width: "200px", 
      }}
    >
      <p className="text-black break-words">{claim}</p>
    </div>
  );
};

export default NewsModal;
