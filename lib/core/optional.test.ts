import { describe, expect, it } from 'vitest';
import { optionalFunc } from './optional.ts';

describe('optionalFunc', () => {
  it('should return an OptionalValue instance with a nonnullable value', () => {
    const value = 'Hello, World!';
    const optional = optionalFunc(value);

    expect(optional).toBeDefined();
    expect(optional.get()).toBe(value);
    expect(optional.isPresent()).toBe(true);
    expect(optional.isEmpty()).toBe(false);
    expect(optional.orElse(undefined)).toBe(value);
    expect(optional.orElseGet(() => 'Default')).toBe(value);
    expect(optional.orElseGetAsync(async () => 'Default')).resolves.toBe(value);
    expect(optional.orElseThrow(new Error('Error'))).toBe(value);
    expect(optional.map((v) => v.length).get()).toEqual(value.length);
    expect(
      optional.mapAsync(async (v) => v.length).then((opt) => opt.get()),
    ).resolves.toEqual(value.length);
    expect(optional.flatMap((v) => optionalFunc(v.length)).get()).toEqual(
      value.length,
    );
    expect(
      optional
        .flatMapAsync(async (v) => optionalFunc(v.length))
        .then((opt) => opt.get()),
    ).resolves.toEqual(value.length);
    expect(optional.filter((v) => v.length > 5)).toEqual(optional);
    expect(optional.filterAsync(async (v) => v.length > 5)).resolves.toEqual(
      optional,
    );
    expect(optional.toString()).toBe(`Optional[${value}]`);
  });

  it('should return an OptionalValue instance with a nullish value', () => {
    const value = null;
    const optional = optionalFunc<string | null>(value);

    expect(optional).toBeDefined();
    expect(optional.orElse(undefined)).toBeUndefined();
    expect(optional.isEmpty()).toBe(true);
    expect(optional.isPresent()).toBe(false);
    expect(optional.orElseGet(() => 'Default')).toBe('Default');
    expect(optional.orElseGetAsync(async () => 'Default')).resolves.toBe(
      'Default',
    );
    expect(optional.toString()).toBe('Optional.empty');
  });
});
