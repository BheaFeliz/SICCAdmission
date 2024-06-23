// components/organisms/CardItem.js

const CardItem = ({ title, description, date, startTime, endTime, onDetailsClick }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
      <p>{startTime} - {endTime}</p>
      <div className="flex justify-between mt-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={onDetailsClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardItem;
