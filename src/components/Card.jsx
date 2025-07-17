const Card = ({ title, count, color }) => (
    <div className={`p-6 rounded-lg shadow text-white ${color}`}>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-2xl font-bold">{count}</p>
    </div>
);
export default Card;