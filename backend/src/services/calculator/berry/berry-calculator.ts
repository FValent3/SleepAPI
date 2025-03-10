import { pokemon, subskill } from 'sleepapi-common';

export function calculateNrOfBerriesPerDrop(pokemon: pokemon.Pokemon, subskills: subskill.SubSkill[]) {
  let base = 1;
  if (pokemon.specialty === 'berry') {
    base += 1;
  }
  if (subskills.includes(subskill.BERRY_FINDING_S)) {
    base += 1;
  }
  return base;
}
