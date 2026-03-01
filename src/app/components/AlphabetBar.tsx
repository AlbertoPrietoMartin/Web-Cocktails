"use client";

import Link from "next/link";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const AlphabetBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px",
        marginTop: "40px",
        padding: "20px",
        borderTop: "1px solid #ccc",
      }}
    >
      {letters.map((letter) => (
        <Link
          key={letter}
          href={`/letra/${letter.toLowerCase()}`}
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            textDecoration: "none",
          }}
        >
          {letter}
        </Link>
      ))}
    </div>
  );
};