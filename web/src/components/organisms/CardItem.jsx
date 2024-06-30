// CardItem.jsx
const CardItem = ({ title, description, date, startTime, endTime, onDetailsClick }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <p><strong>Date:</strong> {date || 'N/A'}</p>
      <p><strong>Time:</strong> {startTime || '-'} - {endTime || '-'}</p>
      <div className="flex justify-between mt-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={onDetailsClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardItem;
