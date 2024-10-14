import type { Optional as OptionalT, TOrNull, TOrUndefined } from '@only/types';
import { emptyOptional, optionalFunc, OptionalValue } from './optional.ts';
import { NullError, NullishError, UndefinedError } from 'errors-es';

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
   * @throws NullishError if the value is null or undefined.
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
   * @throws UndefinedError if the value is undefined.
   */
  ofNullable: <T>(value: TOrNull<T>) => OptionalValue<T>;
  /**
   * Creates an Optional instance with the specified value, which can be null.
   * @param value - The value to wrap in an Optional.
   * @throws NullError if the value is null.
   * @returns An OptionalValue instance containing the specified value.
   */
  ofUndefinable: <T>(value: TOrUndefined<T>) => OptionalValue<T>;

  /**
   * Creates an empty Optional instance.
   * @returns An empty OptionalValue instance.
   */
  empty: <T = unknown>() => OptionalValue<T>;
};

export default {
  of: <T>(value: NonNullable<T>): OptionalValue<T> => {
    if (value !== null && value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new NullishError(undefined, createError('nullish'));
  },
  ofNullish: <T>(value: OptionalT<T>): OptionalValue<T> =>
    optionalFunc<T>(value),
  ofNullable: <T>(value: TOrNull<T>): OptionalValue<T> => {
    if (value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new UndefinedError(createError('undefined'));
  },
  ofUndefinable: <T>(value: TOrUndefined<T>): OptionalValue<T> => {
    if (value !== null) {
      return optionalFunc<T>(value);
    }
    throw new NullError(createError('null'));
  },
  empty: <T = unknown>(): OptionalValue<T> => emptyOptional as OptionalValue<T>,
} as OptionalType;

const createError = (valueType: 'nullish' | 'null' | 'undefined') =>
  `Cannot create an optional value from a ${valueType} value. ${valueType === 'nullish' ? 'If you want to do this on purpose use Optional.ofNullish(). ' : ''}If you want to create an empty optional, use Optional.empty() instead.`;
