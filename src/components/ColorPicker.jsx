const ColorPicker = ({ color, setColor }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor="colorPicker">Color de la remera:</label>
      <input
        id="colorPicker"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

export default ColorPicker;