import { ProductionRequest } from '@src/routes/calculator-router/production-router';
import { calculatePokemonProduction } from '@src/services/api-service/production/production-service';
import { queryAsBoolean, queryAsNumber } from '@src/utils/routing/routing-utils';
import { Body, Controller, Path, Post, Route, Tags } from 'tsoa';

@Route('api/calculator')
@Tags('calculator')
export default class ProductionController extends Controller {
  @Post('production/{name}')
  public async calculatePokemonProduction(@Path() name: string, @Body() body: ProductionRequest) {
    return calculatePokemonProduction(name, this.#parseInput(body));
  }

  #parseInput(input: ProductionRequest) {
    const parsedInput: ProductionRequest = {
      level: queryAsNumber(input.level) ?? 0,
      nature: input.nature,
      subskills: input.subskills,
      e4e: queryAsNumber(input.e4e) ?? 0,
      helpingbonus: queryAsNumber(input.helpingbonus) ?? 0,
      camp: queryAsBoolean(input.camp),
      ingredientSet: input.ingredientSet,
    };
    return parsedInput;
  }
}
