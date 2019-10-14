import React from 'react';

export const buildData = (
  counts: number,
  options?: {
    offset?: number;
  }
) => {
  const { offset = 1 } = options || {};

  return Array.from(Array(counts)).map((_, i) => i + offset);
};

export const buildItems = (counts: number) =>
  buildData(counts).map((d, i) => <p key={i}>{d}</p>);
