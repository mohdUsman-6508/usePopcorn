const starContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const star = {
  display: "flex",
  gap: "3px",
};
const rateText = {
  margin: "0",
  lineHeight: "1",
};

export default function StarRating({ maxRating = 5 }) {
  return (
    <div style={starContainer}>
      <div style={star}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <div style={rateText}>rating</div>
    </div>
  );
}
