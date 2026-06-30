"use client";

export default function WelcomeStep({
  question,
  image,
  noPos,
  moveNo,
  onYes
}) {
  return (
    <div className="card">
      <img className="img" src={image} />

      <h2>{question}</h2>

      <div className="row">
        <button className="yes" onClick={onYes}>
          Да
        </button>

        <button
          className="no"
          onMouseEnter={moveNo}
          onClick={moveNo}
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`
          }}
        >
          Нет
        </button>
      </div>
    </div>
  );
}