import type { Optional as OptionalT, TOrNull, TOrUndefined } from 'only-types';
import { emptyOptional, optionalFunc, OptionalValue } from './optional.ts';

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
   * @throws Error if the value is undefined.
   */
  ofNullable: <T>(value: TOrNull<T>) => OptionalValue<T>;
  /**
   * Creates an Optional instance with the specified value, which can be null.
   * @param value - The value to wrap in an Optional.
   * @throws Error if the value is null.
   * @returns An OptionalValue instance containing the specified value.
   */
  ofUndefinable: <T>(value: TOrUndefined<T>) => OptionalValue<T>;

  /**
   * Creates an empty Optional instance.
   * @returns An empty OptionalValue instance.
   */
  empty: <T = unknown>() => OptionalValue<T>;
};

/**
 * The `Optional` object provides a set of utility functions to handle optional values.
 * It includes methods to create optional values from non-nullable, nullable, nullish, and undefinable values.
 *
 * @type {OptionalType}
 *
 * @property {<T>(value: NonNullable<T>) => OptionalValue<T>} of - Creates an `OptionalValue` from a non-nullable value.
 * Throws an error if the value is null or undefined.
 *
 * @property {<T>(value: OptionalT<T>) => OptionalValue<T>} ofNullish - Creates an `OptionalValue` from a value that can be nullish (null or undefined).
 *
 * @property {<T>(value: TOrNull<T>) => OptionalValue<T>} ofNullable - Creates an `OptionalValue` from a value that can be nullable (null).
 * Throws an error if the value is undefined.
 *
 * @property {<T>(value: TOrUndefined<T>) => OptionalValue<T>} ofUndefinable - Creates an `OptionalValue` from a value that can be undefinable (undefined).
 * Throws an error if the value is null.
 *
 * @property {<T = unknown>() => OptionalValue<T>} empty - Returns an empty `OptionalValue`.
 */
const Optional: OptionalType = {
  of: <T>(value: NonNullable<T>): OptionalValue<T> => {
    if (value !== null && value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new Error(createError('nullish'));
  },
  ofNullish: <T>(value: OptionalT<T>): OptionalValue<T> =>
    optionalFunc<T>(value),
  ofNullable: <T>(value: TOrNull<T>): OptionalValue<T> => {
    if (value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new Error(createError('undefined'));
  },
  ofUndefinable: <T>(value: TOrUndefined<T>): OptionalValue<T> => {
    if (value !== null) {
      return optionalFunc<T>(value);
    }
    throw new Error(createError('null'));
  },
  empty: <T = unknown>(): OptionalValue<T> => emptyOptional as OptionalValue<T>,
};

export default Optional;

const createError = (valueType: 'nullish' | 'null' | 'undefined') =>
  `Cannot create an optional value from a ${valueType} value. ${valueType === 'nullish' ? 'If you want to do this on purpose use Optional.ofNullish(). ' : ''}If you want to create an empty optional, use Optional.empty() instead.`;
