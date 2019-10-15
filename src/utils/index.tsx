import React from 'react';

export const buildData = (
  counts: number,
  options?: {
    offset?: number;
    precision?: number;
    random?: {
      min: number;
      max: number;
    };
  }
) => {
  const { offset = 1, precision = 0, random = { min: 0, max: 0 } } =
    options || {};

  return Array.from(Array(counts)).map((_, i) =>
    parseFloat(
      (
        i +
        Math.random() * (random.max - random.min) +
        random.min +
        offset
      ).toFixed(precision)
    )
  );
};

export const buildItems = (counts: number) =>
  buildData(counts).map((d, i) => <p key={i}>{d}</p>);
