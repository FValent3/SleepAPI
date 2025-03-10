import { OptimalTeamSolution } from '@src/domain/combination/combination';
import { CustomStats } from '@src/domain/combination/custom';
import { DetailedProduce } from '@src/domain/combination/produce';
import { PokemonIngredientSet, berry, nature, pokemon } from 'sleepapi-common';
import { MemoizedFilters, SetCover } from './set-cover';

describe('processOptimalTeamSolutions', () => {
  const filters: MemoizedFilters = {
    limit50: false,
    pokemon: [pokemon.PINSIR.name],
  };

  const setCover = new SetCover(new Map(), filters, new Map());

  it('shall sort teams in each solution and remove duplicates', () => {
    const pc1: PokemonIngredientSet = {
      pokemon: pokemon.PINSIR,
      ingredientList: [],
    };

    const pc2: PokemonIngredientSet = {
      pokemon: pokemon.BLASTOISE,
      ingredientList: [],
    };

    const customStats: CustomStats = {
      level: 60,
      nature: nature.RASH,
      subskills: [],
    };

    const detailedProduce: DetailedProduce = {
      helpsAfterSS: 0,
      helpsBeforeSS: 0,
      produce: { berries: { amount: 0, berry: berry.LEPPA }, ingredients: [] },
      sneakySnack: { amount: 0, berry: berry.LEPPA },
      spilledIngredients: [],
    };

    const optimalTeamSolutions: OptimalTeamSolution[] = [
      {
        team: [
          { pokemonCombination: pc1, customStats, detailedProduce },
          { pokemonCombination: pc2, customStats, detailedProduce },
        ],
        surplus: {
          extra: [],
          relevant: [],
          total: [],
        },
      },
      {
        team: [
          { pokemonCombination: pc2, customStats, detailedProduce },
          { pokemonCombination: pc1, customStats, detailedProduce },
        ],
        surplus: {
          extra: [],
          relevant: [],
          total: [],
        },
      },
    ];

    const processedSolutions = setCover.processOptimalTeamSolutions(optimalTeamSolutions);

    expect(processedSolutions).toHaveLength(1);
    expect(processedSolutions).toEqual([optimalTeamSolutions[0]]);
  });
});
