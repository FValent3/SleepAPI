/**
 * Copyright 2023 Sleep API Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { OptimalTeamSolution, SurplusIngredients } from '@src/domain/combination/combination';
import { CustomStats } from '@src/domain/combination/custom';
import { DetailedProduce } from '@src/domain/combination/produce';
import { IngredientSet, PokemonIngredientSet, pokemon, recipe } from 'sleepapi-common';
import { calculateNrOfBerriesPerDrop } from '../berry/berry-calculator';
import {
  calculateAverageProduce,
  calculateNightlyProduce,
  calculateProduceForSpecificTimeWindow,
} from '../production/produce-calculator';
import { extractIngredientSubskills, extractInventorySubskills } from '../stats/stats-calculator';

/**
 * Combines same ingredients in drop, for example [2 honey, 4 honey, 5 milk] becomes [6 honey, 5 milk]
 * @param ingredients
 * @returns
 */
export function combineSameIngredientsInDrop(ingredients: IngredientSet[]): IngredientSet[] {
  const combined = new Map<string, IngredientSet>();

  for (const drop of ingredients) {
    const { name } = drop.ingredient;
    const existingDrop = combined.get(name);

    if (existingDrop) {
      existingDrop.amount += drop.amount;
    } else {
      combined.set(name, { ...drop });
    }
  }

  return Array.from(combined.values());
}

/**
 * Calculates percentage covered of given meal by given ingredient list
 * @param meal
 * @param combination
 * @returns
 */
export function calculatePercentageCoveredByCombination(
  meal: recipe.Recipe,
  combination: { amount: number; ingredient: { name: string; value?: number } }[]
): number {
  let totalCovered = 0;

  const remainingQuantity: Map<string, number> = new Map<string, number>();
  for (const { amount, ingredient } of meal.ingredients) {
    remainingQuantity.set(ingredient.name, amount);
  }

  for (const { amount, ingredient } of combination) {
    if (remainingQuantity.has(ingredient.name)) {
      const remaining = remainingQuantity.get(ingredient.name) ?? 0;
      if (amount <= remaining) {
        totalCovered += amount;
        remainingQuantity.set(ingredient.name, remaining - amount);
      } else {
        totalCovered += remaining;
        remainingQuantity.set(ingredient.name, 0);
      }
    }
  }

  return (totalCovered / meal.ingredients.reduce((sum, { amount }) => sum + amount, 0)) * 100;
}

export function calculateRemainingIngredients(
  requiredIngredients: IngredientSet[],
  producedIngredients: IngredientSet[]
): IngredientSet[] {
  const remainingIngredients: IngredientSet[] = JSON.parse(JSON.stringify(requiredIngredients));
  for (const produced of producedIngredients) {
    const index = remainingIngredients.findIndex((required) => required.ingredient.name === produced.ingredient.name);
    if (index !== -1) {
      remainingIngredients[index].amount -= produced.amount;
      if (remainingIngredients[index].amount <= 0) {
        remainingIngredients.splice(index, 1);
      }
    }
  }
  return remainingIngredients;
}

export function extractRelevantSurplus(recipe: IngredientSet[], surplus: IngredientSet[]): SurplusIngredients {
  const recipeIngredientNames = new Set(recipe.map((ingredientDrop) => ingredientDrop.ingredient.name));

  const relevant = surplus.filter((ingredientDrop) => recipeIngredientNames.has(ingredientDrop.ingredient.name));
  const extra = surplus.filter((ingredientDrop) => !recipeIngredientNames.has(ingredientDrop.ingredient.name));

  return {
    total: surplus,
    relevant,
    extra,
  };
}

export function sortByMinimumFiller(
  optimalTeamSolutions: OptimalTeamSolution[],
  recipe: IngredientSet[]
): OptimalTeamSolution[] {
  return [...optimalTeamSolutions].sort((a, b) => {
    const aSurplusList = getSurplusList(a.surplus.relevant, recipe);
    const bSurplusList = getSurplusList(b.surplus.relevant, recipe);

    for (let i = 0; i < aSurplusList.length; i++) {
      if (bSurplusList[i] !== aSurplusList[i]) {
        return bSurplusList[i] - aSurplusList[i];
      }
    }

    return 0;
  });
}

export function getSurplusList(surplus: IngredientSet[], requiredIngredients: IngredientSet[]): number[] {
  return requiredIngredients
    .map((reqIngredient) => {
      const foundSurplus = surplus.find((surplusItem) => surplusItem.ingredient.name === reqIngredient.ingredient.name);
      return foundSurplus ? foundSurplus.amount : 0;
    })
    .sort((a, b) => a - b);
}

export function getAllIngredientCombinationsForLevel(pokemon: pokemon.Pokemon, level: number): IngredientSet[][] {
  const result: Array<Array<IngredientSet>> = [];

  const ing0 = pokemon.ingredient0;
  if (level < 30) {
    result.push([ing0]);
  } else {
    for (const ing30 of pokemon.ingredient30) {
      if (level < 60) {
        result.push([ing0, ing30]);
      } else {
        for (const ing60 of pokemon.ingredient60) {
          result.push([ing0, ing30, ing60]);
        }
      }
    }
  }

  return result;
}

/**
 * Calculates average ingredients produced per meal with natural declining energy
 * Calculate average nightly produce and subtracts overflow ingredients
 */
export function calculateProducePerMealWindow(params: {
  pokemonCombination: PokemonIngredientSet;
  customStats: CustomStats;
  goodCamp?: boolean;
  helpingBonus?: number;
  e4eProcs?: number;
  combineIngredients?: boolean;
}): DetailedProduce {
  const { pokemonCombination, customStats, goodCamp, helpingBonus, e4eProcs, combineIngredients = false } = params;

  const MEALS_IN_DAY = 3;

  const averageIngredientDrop = calculateAverageIngredientDrop(customStats.level, pokemonCombination);
  const averagedPokemonCombination: PokemonIngredientSet = {
    pokemon: pokemonCombination.pokemon,
    ingredientList: averageIngredientDrop,
  };

  const ingredientSubskills = extractIngredientSubskills(customStats.subskills);
  const ingredientPercentage =
    (averagedPokemonCombination.pokemon.ingredientPercentage / 100) *
    customStats.nature.ingredient *
    ingredientSubskills;

  const berriesPerDrop = calculateNrOfBerriesPerDrop(averagedPokemonCombination.pokemon, customStats.subskills);

  const daytimeProduce = calculateProduceForSpecificTimeWindow({
    averagedPokemonCombination,
    ingredientPercentage,
    customStats,
    energyPeriod: 'DAY',
    timeWindow: 15.5,
    goodCamp,
    helpingBonus,
    e4eProcs,
  });

  const nighttimeProduce = calculateProduceForSpecificTimeWindow({
    averagedPokemonCombination,
    ingredientPercentage,
    customStats,
    energyPeriod: 'NIGHT',
    timeWindow: 8.5,
    goodCamp,
    helpingBonus,
    e4eProcs,
  });

  const averageProduce = calculateAverageProduce(averagedPokemonCombination, ingredientPercentage, berriesPerDrop);

  const maxCarrySize = pokemonCombination.pokemon.maxCarrySize + extractInventorySubskills(customStats.subskills);

  const detailedNightlyProduce = calculateNightlyProduce(
    maxCarrySize,
    averageProduce,
    nighttimeProduce,
    berriesPerDrop
  );

  const producedIngredients = combineIngredientDrops(
    daytimeProduce.ingredients,
    detailedNightlyProduce.produce.ingredients
  ).map(({ amount, ingredient }) => ({
    amount: amount / MEALS_IN_DAY,
    ingredient: ingredient,
  }));

  return {
    produce: {
      berries: {
        berry: daytimeProduce.berries.berry,
        amount: daytimeProduce.berries.amount + detailedNightlyProduce.produce.berries.amount,
      },
      ingredients: combineIngredients ? combineSameIngredientsInDrop(producedIngredients) : producedIngredients,
    },
    sneakySnack: detailedNightlyProduce.sneakySnack,
    spilledIngredients: combineIngredients
      ? combineSameIngredientsInDrop(detailedNightlyProduce.spilledIngredients)
      : detailedNightlyProduce.spilledIngredients,
    helpsBeforeSS: detailedNightlyProduce.helpsBeforeSS,
    helpsAfterSS: detailedNightlyProduce.helpsAfterSS,
  };
}

export function combineIngredientDrops(array1: IngredientSet[], array2: IngredientSet[]): IngredientSet[] {
  return array1.reduce((acc: IngredientSet[], curr: IngredientSet, index: number) => {
    const other: IngredientSet = array2[index];
    if (curr.ingredient.name === other.ingredient.name) {
      acc.push({
        amount: curr.amount + other.amount,
        ingredient: curr.ingredient,
      });
    } else {
      acc.push(curr, other);
    }
    return acc;
  }, []);
}

export function calculateAverageIngredientDrop(level: number, pokemonCombination: PokemonIngredientSet) {
  const combinationWithoutLockedIngredients =
    level >= 60 ? pokemonCombination.ingredientList : pokemonCombination.ingredientList.slice(0, 2);
  return combinationWithoutLockedIngredients.map((comb) => {
    return {
      amount: comb.amount / combinationWithoutLockedIngredients.length,
      ingredient: comb.ingredient,
    };
  });
}

export function sumOfIngredients(ingredients: IngredientSet[]) {
  return ingredients.map((ing) => ing.amount).reduce((sum, amount) => sum + amount, 0);
}

export function calculateContributedIngredientsValue(
  meal: recipe.Recipe,
  producedIngredients: IngredientSet[]
): { contributedValue: number; fillerValue: number } {
  const recipeIngredients: Map<string, number> = new Map<string, number>();
  for (const { amount, ingredient } of meal.ingredients) {
    recipeIngredients.set(ingredient.name, amount);
  }

  let contributedValue = 0;
  let fillerValue = 0;
  for (const { amount, ingredient } of producedIngredients) {
    if (recipeIngredients.has(ingredient.name)) {
      const recipeAmount = recipeIngredients.get(ingredient.name) ?? 0;

      if (amount <= recipeAmount) {
        contributedValue += amount * ingredient.value;
      } else {
        contributedValue += recipeAmount * ingredient.value;
        fillerValue += (amount - recipeAmount) * ingredient.taxedValue;
      }
    } else {
      // produced ingredient is not in recipe
      fillerValue += amount * ingredient.taxedValue;
    }
  }

  const mealBonus = 1 + meal.bonus / 100;
  const level50RecipeBonus = 2.48;

  return {
    contributedValue: contributedValue * mealBonus * level50RecipeBonus,
    fillerValue,
  };
}
