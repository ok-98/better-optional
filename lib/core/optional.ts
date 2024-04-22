import type { EmptyFunction, Optional, SimpleFunction } from 'only-utils';

/**
 * Represents an optional value that may or may not be present.
 * @template T - The type of the optional value.
 */
export type OptionalValue<T> = {
  /**
   * Retrieves the value if present, otherwise returns undefined.
   * @returns The optional value or throws an err.
   */
  get: () => NonNullable<T>;

  /**
   * Returns this optional value if present, otherwise returns the other optional value.
   * @template R - The type of the other optional value.
   * @param other - The other optional value.
   * @returns This optional value or the other optional value.
   */
  or: <R>(other: OptionalValue<R>) => OptionalValue<T> | OptionalValue<R>;

  /**
   * Checks if the optional value is present.
   * @returns True if the optional value is present, false otherwise.
   */
  isPresent: () => boolean;

  /**
   * Checks if the optional value is not present.
   * @returns True if the optional value is present, false otherwise.
   */
  isEmpty: () => boolean;

  /**
   * Returns the value if present, otherwise returns the default value.
   * @param defaultValue - The default value to return if the optional value is not present.
   * @returns The value if present, otherwise the default value.
   */
  orElse: <R = T>(defaultValue: R) => T | R;

  /**
   * Returns the value if present, otherwise returns the value supplied by the supplier function.
   * @param supplier - The function that supplies the value if the optional value is not present.
   * @returns The value if present, otherwise the value supplied by the supplier function.
   */
  orElseGet: <R = T>(supplier: () => R) => T | R;

  /**
   * Returns the value if present, otherwise returns the value supplied by the supplier function.
   * @param supplier - The function that supplies the value if the optional value is not present.
   * @returns The value if present, otherwise the value supplied by the supplier function.
   */
  orElseGetAsync: <R = T>(supplier: () => Promise<R>) => Promise<T | R>;

  /**
   * Returns the value if present, otherwise throws the specified error.
   * @param error - The error to throw if the optional value is not present.
   * @returns The value if present.
   * @throws The specified error if the optional value is not present.
   */
  orElseThrow: <E extends Error>(error: E) => NonNullable<T>;

  /**
   * Executes the specified callback function if the optional value is present.
   * @param callback - The callback function to execute.
   */
  ifPresent: (callback: SimpleFunction<NonNullable<T>>) => void;

  /**
   * Executes the specified async callback function if the optional value is present.
   * @param callback - The callback function to execute.
   */
  ifPresentAsync: (
    callback: SimpleFunction<NonNullable<T>, Promise<void>>,
  ) => Promise<void>;

  /**
   * Executes the specified callback function if the optional value is present, otherwise executes the empty action.
   * @param callback - The callback function to execute if the optional value is present.
   * @param emptyAction - The action to execute if the optional value is not present.
   */
  ifPresentOrElse: (
    callback: SimpleFunction<NonNullable<T>>,
    emptyAction: EmptyFunction,
  ) => void;

  /**
   * Executes the specified callback function if the optional value is present, otherwise executes the empty action.
   * @param callback - The callback function to execute if the optional value is present.
   * @param emptyAction - The action to execute if the optional value is not present.
   */
  ifPresentOrElseAsync: (
    callback: SimpleFunction<NonNullable<T>, Promise<void>>,
    emptyAction: EmptyFunction<Promise<void>>,
  ) => Promise<void>;

  /**
   * Filters the optional value based on the specified predicate function.
   * @param predicate - The predicate function to filter the optional value.
   * @returns A new optional value that contains the filtered value if present, otherwise an empty optional value.
   */
  filter: (
    predicate: SimpleFunction<NonNullable<T>, boolean>,
  ) => OptionalValue<T>;

  /**
   * Filters the optional value based on the specified async predicate function.
   * @param predicate - The predicate function to filter the optional value.
   * @returns A new optional value that contains the filtered value if present, otherwise an empty optional value.
   */
  filterAsync: (
    predicate: SimpleFunction<NonNullable<T>, Promise<boolean>>,
  ) => Promise<OptionalValue<T>>;

  /**
   * Maps the optional value to a new value using the specified mapper function. It is usefull for nested optionals.
   * @template R - The type of the new value.
   * @param mapper - The mapper function to transform the optional value.
   * @returns A new optional value that contains the mapped value if present, otherwise an empty optional value.
   */
  map: <R>(mapper: SimpleFunction<NonNullable<T>, R>) => OptionalValue<R>;

  /**
   * Maps the optional value to a new value using the specified async mapper function.
   * @template R - The type of the new value.
   * @param mapper - The mapper function to transform the optional value.
   * @returns A new optional value that contains the mapped value if present, otherwise an empty optional value.
   */
  mapAsync: <R>(
    mapper: SimpleFunction<NonNullable<T>, Promise<R>>,
  ) => Promise<OptionalValue<R>>;

  /**
   * Maps the optional value to a new optional using the specified mapper function.
   * @template R - The type of the new value.
   * @param mapper - The mapper function to transform the optional value.
   * @returns A new optional value that contains the mapped value if present, otherwise an empty optional value.
   */
  flatMap: <R>(
    mapper: SimpleFunction<NonNullable<T>, OptionalValue<R>>,
  ) => OptionalValue<R>;

  /**
   * Maps the optional value to a new optional using the specified async mapper function.
   * @template R - The type of the new value.
   * @param mapper - The mapper function to transform the optional value.
   * @returns A new optional value that contains the mapped value if present, otherwise an empty optional value.
   */
  flatMapAsync: <R>(
    mapper: SimpleFunction<NonNullable<T>, Promise<OptionalValue<R>>>,
  ) => Promise<OptionalValue<R>>;
};

type OptionalValueWithValueOf<T> = OptionalValue<T> & Object;

/**
 * Represents an empty optional value.
 * @returns {OptionalValue<unknown>} - An empty optional value.
 */
export const emptyOptional = optionalFunc<unknown>(void 0);

/**
 * This is similar like the Optional class in Java.
 * Creates an optional value wrapper around the provided value.
 * An optional value can either contain a defined value or be empty.
 *
 * @typeparam T - The type of the value being wrapped.
 * @param value - The value to be wrapped.
 * @returns An object with various utility methods to work with the optional value.
 */
export function optionalFunc<T>(value: Optional<T>): OptionalValue<T> {
  const defined = value !== null && value !== undefined;

  const returnValue: OptionalValueWithValueOf<T> = {
    get: function () {
      if (defined) {
        return value!;
      }
      throw new Error('Value is not present');
    },
    valueOf: function () {
      return value!;
    },
    or: function <R>(other: OptionalValue<R>) {
      return defined ? this : other;
    },
    isPresent: function () {
      return defined;
    },
    isEmpty: function () {
      return !defined;
    },
    orElse: function <R = T>(defaultValue: R) {
      return defined ? value! : defaultValue;
    },
    orElseGet: function <R = T>(supplier: () => R) {
      return defined ? value! : supplier();
    },
    orElseGetAsync: async function <R = T>(supplier: () => Promise<R>) {
      return defined ? value! : await supplier();
    },
    orElseThrow: function <E extends Error>(error: E) {
      if (defined) {
        return value!;
      }
      throw error;
    },
    map: function <R>(
      mapper: SimpleFunction<NonNullable<T>, R>,
    ): OptionalValue<R> {
      return defined
        ? optionalFunc(mapper(value))
        : (emptyOptional as OptionalValue<R>);
    },
    mapAsync: async function <R>(
      mapper: SimpleFunction<NonNullable<T>, Promise<R>>,
    ): Promise<OptionalValue<R>> {
      return defined
        ? optionalFunc<R>(await mapper(value))
        : (emptyOptional as OptionalValue<R>);
    },
    flatMap: function <R>(
      mapper: SimpleFunction<NonNullable<T>, OptionalValue<R>>,
    ): OptionalValue<R> {
      return defined ? mapper(value) : (emptyOptional as OptionalValue<R>);
    },
    flatMapAsync: async function <R>(
      mapper: SimpleFunction<NonNullable<T>, Promise<OptionalValue<R>>>,
    ): Promise<OptionalValue<R>> {
      return defined
        ? await mapper(value)
        : (emptyOptional as OptionalValue<R>);
    },
    filter: function (
      predicate: SimpleFunction<NonNullable<T>, boolean>,
    ): OptionalValue<T> {
      return defined && predicate(value)
        ? this
        : (emptyOptional as OptionalValue<T>);
    },
    filterAsync: async function (
      predicate: SimpleFunction<NonNullable<T>, Promise<boolean>>,
    ): Promise<OptionalValue<T>> {
      return defined && (await predicate(value))
        ? this
        : (emptyOptional as OptionalValue<T>);
    },
    ifPresent: function (callback: SimpleFunction<NonNullable<T>>): void {
      if (defined) {
        callback(value);
      }
    },
    ifPresentAsync: async function (
      callback: SimpleFunction<NonNullable<T>, Promise<void>>,
    ): Promise<void> {
      if (defined) {
        await callback(value);
      }
    },
    ifPresentOrElse: function (
      callback: SimpleFunction<NonNullable<T>>,
      emptyAction: EmptyFunction,
    ): void {
      if (defined) {
        callback(value);
      } else {
        emptyAction();
      }
    },
    ifPresentOrElseAsync: async function (
      callback: SimpleFunction<NonNullable<T>, Promise<void>>,
      emptyAction: EmptyFunction<Promise<void>>,
    ): Promise<void> {
      if (defined) {
        await callback(value);
      } else {
        await emptyAction();
      }
    },
    toString: function () {
      return defined ? `Optional[${value.toString()}]` : 'Optional.empty';
    },
    toLocaleString: function () {
      return defined ? `Optional[${value.toLocaleString()}]` : 'Optional.empty';
    },
  };

  return returnValue as OptionalValue<T>;
}
