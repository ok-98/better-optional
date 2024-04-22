import type { Optional as Nullish, TOrNull, TOrUndefined } from 'only-utils';
import { emptyOptional, optionalFunc, OptionalValue } from './optional.ts';

/**
 * This is similar like the Optional class in Java.
 * Creates an optional value wrapper around the provided value.
 * An optional value can either contain a defined value or be empty.
 */
type OptionalType = {
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
  ofNullish: <T>(value: Nullish<T>) => OptionalValue<T>;

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
    throw new Error(
      'Cannot create an optional value from a nullish value. If you want to do this on purpose use Optional.ofNullish(). If you want to create an empty optional, use Optional.empty() instead.',
    );
  },
  ofNullish: <T>(value: Nullish<T>): OptionalValue<T> => optionalFunc<T>(value),
  ofNullable: <T>(value: TOrNull<T>): OptionalValue<T> => {
    if (value !== undefined) {
      return optionalFunc<T>(value);
    }
    throw new Error(
      'Cannot create an optional value from a undefined value. If you want to create an empty optional, use Optional.empty() instead.',
    );
  },
  ofUndefinable: <T>(value: TOrUndefined<T>): OptionalValue<T> => {
    if (value !== null) {
      return optionalFunc<T>(value);
    }
    throw new Error(
      'Cannot create an optional value from a null value. If you want to create an empty optional, use Optional.empty() instead.',
    );
  },
  empty: <T = unknown>(): OptionalValue<T> => emptyOptional as OptionalValue<T>,
};
