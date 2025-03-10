import {
  FANCY_APPLE,
  FANCY_EGG,
  GREENGRASS_CORN,
  GREENGRASS_SOYBEANS,
  HONEY,
  MOOMOO_MILK,
  PURE_OIL,
  SNOOZY_TOMATO,
  SOFT_POTATO,
  SOOTHING_CACAO,
  TASTY_MUSHROOM,
  WARMING_GINGER,
} from '../ingredient/ingredient';
import { Recipe } from './recipe';

export const WARM_MOOMOO_MILK: Recipe = {
  name: 'WARM_MOOMOO_MILK',
  value: 727,
  value50: 1803,
  type: 'dessert',
  ingredients: [{ amount: 7, ingredient: MOOMOO_MILK }],
  bonus: 6,
  nrOfIngredients: 7,
};

export const FANCY_APPLE_JUICE: Recipe = {
  name: 'FANCY_APPLE_JUICE',
  value: 763,
  value50: 1892,
  type: 'dessert',
  ingredients: [{ amount: 8, ingredient: FANCY_APPLE }],
  bonus: 6,
  nrOfIngredients: 8,
};

export const CRAFT_SODA_POP: Recipe = {
  name: 'CRAFT_SODA_POP',
  value: 964,
  value50: 2391,
  type: 'dessert',
  ingredients: [{ amount: 9, ingredient: HONEY }],
  bonus: 6,
  nrOfIngredients: 9,
};

export const LUCKY_CHANT_APPLE_PIE: Recipe = {
  name: 'LUCKY_CHANT_APPLE_PIE',
  value: 1634,
  value50: 4052,
  type: 'dessert',
  ingredients: [
    { amount: 12, ingredient: FANCY_APPLE },
    { amount: 4, ingredient: MOOMOO_MILK },
  ],
  bonus: 11,
  nrOfIngredients: 16,
};

export const FLUFFY_SWEET_POTATOES: Recipe = {
  name: 'FLUFFY_SWEET_POTATOES',
  value: 1783,
  value50: 4422,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: SOFT_POTATO },
    { amount: 5, ingredient: MOOMOO_MILK },
  ],
  bonus: 11,
  nrOfIngredients: 14,
};

export const EMBER_GINGER_TEA: Recipe = {
  name: 'EMBER_GINGER_TEA',
  value: 1788,
  value50: 4434,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: WARMING_GINGER },
    { amount: 7, ingredient: FANCY_APPLE },
  ],
  bonus: 11,
  nrOfIngredients: 16,
};

export const CLOUD_NINE_SOY_CAKE: Recipe = {
  name: 'CLOUD_NINE_SOY_CAKE',
  value: 1798,
  value50: 4459,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: FANCY_EGG },
    { amount: 7, ingredient: GREENGRASS_SOYBEANS },
  ],
  bonus: 11,
  nrOfIngredients: 16,
};

export const STALWART_VEGETABLE_JUICE: Recipe = {
  name: 'STALWART_VEGETABLE_JUICE',
  value: 1798,
  value50: 4459,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: SNOOZY_TOMATO },
    { amount: 7, ingredient: FANCY_APPLE },
  ],
  bonus: 11,
  nrOfIngredients: 16,
};

export const BIG_MALASADA: Recipe = {
  name: 'BIG_MALASADA',
  value: 2927,
  value50: 7259,
  type: 'dessert',
  ingredients: [
    { amount: 10, ingredient: PURE_OIL },
    { amount: 7, ingredient: MOOMOO_MILK },
    { amount: 6, ingredient: HONEY },
  ],
  bonus: 17,
  nrOfIngredients: 23,
};

export const HUSTLE_PROTEIN_SMOOTHIE: Recipe = {
  name: 'HUSTLE_PROTEIN_SMOOTHIE',
  value: 3168,
  value50: 7857,
  type: 'dessert',
  ingredients: [
    { amount: 15, ingredient: GREENGRASS_SOYBEANS },
    { amount: 8, ingredient: SOOTHING_CACAO },
  ],
  bonus: 17,
  nrOfIngredients: 23,
};

export const HUGE_POWER_SOY_DONUTS: Recipe = {
  name: 'HUGE_POWER_SOY_DONUTS',
  value: 3213,
  value50: 7968,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: PURE_OIL },
    { amount: 6, ingredient: GREENGRASS_SOYBEANS },
    { amount: 7, ingredient: SOOTHING_CACAO },
  ],
  bonus: 17,
  nrOfIngredients: 22,
};

export const SWEET_SCENT_CHOCOLATE_CAKE: Recipe = {
  name: 'SWEET_SCENT_CHOCOLATE_CAKE',
  value: 3280,
  value50: 8134,
  type: 'dessert',
  ingredients: [
    { amount: 9, ingredient: HONEY },
    { amount: 8, ingredient: SOOTHING_CACAO },
    { amount: 7, ingredient: MOOMOO_MILK },
  ],
  bonus: 17,
  nrOfIngredients: 24,
};

export const LOVELY_KISS_SMOOTHIE: Recipe = {
  name: 'LOVELY_KISS_SMOOTHIE',
  value: 4734,
  value50: 11740,
  type: 'dessert',
  ingredients: [
    { amount: 11, ingredient: FANCY_APPLE },
    { amount: 9, ingredient: MOOMOO_MILK },
    { amount: 7, ingredient: HONEY },
    { amount: 8, ingredient: SOOTHING_CACAO },
  ],
  bonus: 25,
  nrOfIngredients: 35,
};

export const STEADFAST_GINGER_COOKIES: Recipe = {
  name: 'STEADFAST_GINGER_COOKIES',
  value: 4921,
  value50: 12204,
  type: 'dessert',
  ingredients: [
    { amount: 14, ingredient: HONEY },
    { amount: 12, ingredient: WARMING_GINGER },
    { amount: 5, ingredient: SOOTHING_CACAO },
    { amount: 4, ingredient: FANCY_EGG },
  ],
  bonus: 25,
  nrOfIngredients: 35,
};

export const NEROLIS_RESTORATIVE_TEA: Recipe = {
  name: 'NEROLIS_RESTORATIVE_TEA',
  value: 5065,
  value50: 12561,
  type: 'dessert',
  ingredients: [
    { amount: 11, ingredient: WARMING_GINGER },
    { amount: 15, ingredient: FANCY_APPLE },
    { amount: 9, ingredient: TASTY_MUSHROOM },
  ],
  bonus: 25,
  nrOfIngredients: 35,
};

export const EXPLOSION_POPCORN: Recipe = {
  name: 'EXPLOSION_POPCORN',
  value: 6048,
  value50: 14999,
  type: 'dessert',
  ingredients: [
    { amount: 15, ingredient: GREENGRASS_CORN },
    { amount: 14, ingredient: PURE_OIL },
    { amount: 7, ingredient: MOOMOO_MILK },
  ],
  bonus: 35,
  nrOfIngredients: 36,
};

export const JIGGLYPUFFS_FRUITY_FLAN: Recipe = {
  name: 'JIGGLYPUFFS_FRUITY_FLAN',
  value: 7594,
  value50: 18833,
  type: 'dessert',
  ingredients: [
    { amount: 20, ingredient: HONEY },
    { amount: 15, ingredient: FANCY_EGG },
    { amount: 10, ingredient: MOOMOO_MILK },
    { amount: 10, ingredient: FANCY_APPLE },
  ],
  bonus: 35,
  nrOfIngredients: 55,
};

export const TEATIME_CORN_SCONES: Recipe = {
  name: 'TEATIME_CORN_SCONES',
  value: 10925,
  value50: 27094,
  type: 'dessert',
  ingredients: [
    { amount: 20, ingredient: FANCY_APPLE },
    { amount: 20, ingredient: WARMING_GINGER },
    { amount: 18, ingredient: GREENGRASS_CORN },
    { amount: 9, ingredient: MOOMOO_MILK },
  ],
  bonus: 48,
  nrOfIngredients: 67,
};

export const DESSERTS: Recipe[] = [
  WARM_MOOMOO_MILK,
  FANCY_APPLE_JUICE,
  CRAFT_SODA_POP,
  LUCKY_CHANT_APPLE_PIE,
  FLUFFY_SWEET_POTATOES,
  EMBER_GINGER_TEA,
  CLOUD_NINE_SOY_CAKE,
  STALWART_VEGETABLE_JUICE,
  BIG_MALASADA,
  HUSTLE_PROTEIN_SMOOTHIE,
  HUGE_POWER_SOY_DONUTS,
  SWEET_SCENT_CHOCOLATE_CAKE,
  LOVELY_KISS_SMOOTHIE,
  STEADFAST_GINGER_COOKIES,
  NEROLIS_RESTORATIVE_TEA,
  EXPLOSION_POPCORN,
  JIGGLYPUFFS_FRUITY_FLAN,
  TEATIME_CORN_SCONES,
];
