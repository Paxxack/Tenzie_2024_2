export default function Dice({ value, isClicked, handleChoice }) {
  const style = isClicked ? "diceClicked" : "diceIdle";
  return (
    <div>
      <button className={style} onClick={handleChoice}>
        {value}
      </button>
    </div>
  );
}
