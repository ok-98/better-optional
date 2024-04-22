import { describe, expect, it } from 'vitest';
import { Optional as optional } from './index.ts';

describe('OptionalType', () => {
  it('should create an OptionalValue instance with a nonnullable value', () => {
    const value = 'Hello, World!';
    const result = optional.of(value);

    expect(result).toBeDefined();
    expect(result.get()).toBe(value);
  });

  it('should create an OptionalValue instance with a nullish value', () => {
    const value = null;
    const result = optional.ofNullish(value);
    expect(result).toBeDefined();
    expect(result.orElse(undefined)).toBeUndefined();
    expect(result.isEmpty()).toBe(true);
  });

  it('should create an OptionalValue instance with a nullable value', () => {
    const value = 42;
    const result = optional.ofNullable(value);

    expect(result).toBeDefined();
    expect(result.get()).toBe(value);
  });

  it('should create an OptionalValue instance with an undefinable value', () => {
    const value = undefined;
    const result = optional.ofUndefinable(value);

    expect(result).toBeDefined();
    expect(result.isEmpty()).toBe(true);
    expect(result.isPresent()).toBe(false);
  });

  it('should create an empty OptionalValue instance', () => {
    const result = optional.empty();

    expect(result).toBeDefined();
    expect(result.isEmpty()).toBe(true);
  });
});
