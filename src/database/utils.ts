import { database } from '.';
import createSelectorUtils from 'drizzle-select-utils';

export const databaseTakeUniqueOrThrow = <T extends unknown[]>(
  values: T,
  inArray: boolean = false
): T[number] => {
  if (values.length === 0) {
    return false;
  }

  if (inArray) {
    return values;
  }

  return values[0];
};

export const { selectOnly, selectExcept, getCount, doesExist } =
  createSelectorUtils(database);
