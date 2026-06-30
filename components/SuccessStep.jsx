"use client";

export default function SuccessStep({
  image,
  onNext
}) {
  return (
    <div className="card">
      <img className="img" src={image} />

      <h2>я знал 😌</h2>

      <button
        className="yes"
        onClick={onNext}
      >
        дальше
      </button>
    </div>
  );
}