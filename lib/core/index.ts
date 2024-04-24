import type { OptionalT, TOrNull, TOrUndefined } from 'only-utils';
import { emptyOptional, optionalFunc, OptionalValue } from './optional.ts';
import { errors } from './errors.ts';

/**
 * This is similar like the Optional class in Java.
 * Creates an optional value wrapper around the provided value.
 * An optional value can either contain a defined value or be empty.
 */
export type OptionalType = {
  /**
   * Creates an Optional instance with the specified nonnullable value.
   * @param value - The value to wrap in an Optional.
   * @returns An OptionalValue instance containing the specified value.
   * @throws Error if the value is null or undefined.
   */
  of: <T>(value: NonNullable<T>) => OptionalValue<T>;

  /**
   * Creates an Optional instance with the specified value, which can be null or undefined.
   * @param value - The value to wrap in an Optional.
   * @returns An OptionalValue instance containing the specified value.
   */
  ofNullish: <T>(value: OptionalT<T>) => OptionalValue<T>;

  /**
   * Creates an Optional instance with the specified value, which can be null.
   * @param value - The value to wrap in an Optional.
   * @returns An OptionalValue instance containing the specified value.
   */
  ofNullable: <T>(value: TOrNull<T>) => OptionalValue<T>;
  /**
   * Creates an Optional instance with the specified value, which can be null.
   * @param value - The value to wrap in an Optional.
   * @returns An OptionalValue instance containing the specified value.
   */
  ofUndefinable: <T>(value: TOrUndefined<T>) => OptionalValue<T>;

  /**
   * Creates an empty Optional instance.
   * @returns An empty OptionalValue instance.
   */
  empty: <T = unknown>() => OptionalValue<T>;
};

export const Optional: OptionalType = {
  of: <T>(value: NonNullable<T>): OptionalValue<T> => {
    if (value !== null && value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new Error(errors.createError('nullish'));
  },
  ofNullish: <T>(value: OptionalT<T>): OptionalValue<T> =>
    optionalFunc<T>(value),
  ofNullable: <T>(value: TOrNull<T>): OptionalValue<T> => {
    if (value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new Error(errors.createError('undefined'));
  },
  ofUndefinable: <T>(value: TOrUndefined<T>): OptionalValue<T> => {
    if (value !== null) {
      return optionalFunc<T>(value);
    }
    throw new Error(errors.createError('null'));
  },
  empty: <T = unknown>(): OptionalValue<T> => emptyOptional as OptionalValue<T>,
};
