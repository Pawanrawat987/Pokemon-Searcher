// Simple color map so each Pokemon type gets its own badge/background color
export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export function getTypeColor(type) {
  return TYPE_COLORS[type] || '#777777';
}

// Two-tone gradient built from a pokemon's type(s), used behind the details card
export function getTypeGradient(types = []) {
  if (!types.length) return 'linear-gradient(135deg, #777, #999)';
  const c1 = getTypeColor(types[0]);
  const c2 = getTypeColor(types[1] || types[0]);
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}
