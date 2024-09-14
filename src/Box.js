function Box({ sign, addSign }) {
  return (
    <div className="box" onClick={addSign}>
      {sign}
    </div>
  );
}

export default Box;
