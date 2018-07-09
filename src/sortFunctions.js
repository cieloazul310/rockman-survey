export function sortDefault(a, b) {
  return a.id - b.id;
}

export function sortByYear(a, b) {
  return a.year !== b.year ? parseInt(a.year, 10) - parseInt(b.year, 10) : sortDefault(a, b);
}

export function sortByArtist(a, b) {
  return getYomi(a) !== getYomi(b)
    ? getYomi(a).localeCompare(getYomi(b))
    : sortByYear(a, b);
}

export function sortByNation(a, b) {
  return a.nation !== b.nation ? a.nation - b.nation : sortByArtist(a, b);
}

function getYomi(d) {
  const the = d.artist.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ')
    return d.artist.slice(4);
  return d.kana || d.artist;
}
