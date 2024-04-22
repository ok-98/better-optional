# better-optional.js

---

![NPM Version](https://img.shields.io/npm/v/better-optional) ![NPM Downloads](https://img.shields.io/npm/dt/better-optional) ![npm bundle size](https://img.shields.io/bundlephobia/min/better-optional) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/better-optional) ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/better-optional) ![NPM License](https://img.shields.io/npm/l/better-optional)

Functional "Optionals" solution for JavaScript and TypeScript with async support.

---

## Install

Install using npm or your favourite package manager:

Install package:

```sh
# npm
npm install better-optional

# yarn
yarn add better-optional

# pnpm
pnpm add better-optional

# bun
bun install better-optional
```


## Table of contents

### Type Aliases

- [OptionalType](modules.md#optionaltype)
- [OptionalValue](modules.md#optionalvalue)

### Variables

- [Optional](modules.md#optional)

## Type Aliases

### OptionalType

Ƭ **OptionalType**: `Object`

This is similar like the Optional class in Java.
Creates an optional value wrapper around the provided value.
An optional value can either contain a defined value or be empty.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `empty` | \<T\>() => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |
| `of` | \<T\>(`value`: `NonNullable`\<`T`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |
| `ofNullable` | \<T\>(`value`: `TOrNull`\<`T`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |
| `ofNullish` | \<T\>(`value`: `Nullish`\<`T`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |
| `ofUndefinable` | \<T\>(`value`: `TOrUndefined`\<`T`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |

#### Defined in

[core/index.ts:9](https://github.com/kacper-olszanski/better-optional/blob/faa41243be11113d590b8c27c9fb9dab5cbf6704/lib/core/index.ts#L9)

___

### OptionalValue

Ƭ **OptionalValue**\<`T`\>: `Object`

Represents an optional value that may or may not be present.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the optional value. |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter` | (`predicate`: `SimpleFunction`\<`NonNullable`\<`T`\>, `boolean`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> | - |
| `filterAsync` | (`predicate`: `SimpleFunction`\<`NonNullable`\<`T`\>, `Promise`\<`boolean`\>\>) => `Promise`\<[`OptionalValue`](modules.md#optionalvalue)\<`T`\>\> | - |
| `flatMap` | \<R\>(`mapper`: `SimpleFunction`\<`NonNullable`\<`T`\>, [`OptionalValue`](modules.md#optionalvalue)\<`R`\>\>) => [`OptionalValue`](modules.md#optionalvalue)\<`R`\> | - |
| `flatMapAsync` | \<R\>(`mapper`: `SimpleFunction`\<`NonNullable`\<`T`\>, `Promise`\<[`OptionalValue`](modules.md#optionalvalue)\<`R`\>\>\>) => `Promise`\<[`OptionalValue`](modules.md#optionalvalue)\<`R`\>\> | - |
| `get` | () => `NonNullable`\<`T`\> | - |
| `ifPresent` | (`callback`: `SimpleFunction`\<`NonNullable`\<`T`\>\>) => `void` | - |
| `ifPresentAsync` | (`callback`: `SimpleFunction`\<`NonNullable`\<`T`\>, `Promise`\<`void`\>\>) => `Promise`\<`void`\> | - |
| `ifPresentOrElse` | (`callback`: `SimpleFunction`\<`NonNullable`\<`T`\>\>, `emptyAction`: `EmptyFunction`) => `void` | - |
| `ifPresentOrElseAsync` | (`callback`: `SimpleFunction`\<`NonNullable`\<`T`\>, `Promise`\<`void`\>\>, `emptyAction`: `EmptyFunction`\<`Promise`\<`void`\>\>) => `Promise`\<`void`\> | - |
| `isEmpty` | () => `boolean` | - |
| `isPresent` | () => `boolean` | - |
| `map` | \<R\>(`mapper`: `SimpleFunction`\<`NonNullable`\<`T`\>, `R`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`R`\> | - |
| `mapAsync` | \<R\>(`mapper`: `SimpleFunction`\<`NonNullable`\<`T`\>, `Promise`\<`R`\>\>) => `Promise`\<[`OptionalValue`](modules.md#optionalvalue)\<`R`\>\> | - |
| `or` | \<R\>(`other`: [`OptionalValue`](modules.md#optionalvalue)\<`R`\>) => [`OptionalValue`](modules.md#optionalvalue)\<`T`\> \| [`OptionalValue`](modules.md#optionalvalue)\<`R`\> | - |
| `orElse` | \<R\>(`defaultValue`: `R`) => `T` \| `R` | - |
| `orElseGet` | \<R\>(`supplier`: () => `R`) => `T` \| `R` | - |
| `orElseGetAsync` | \<R\>(`supplier`: () => `Promise`\<`R`\>) => `Promise`\<`T` \| `R`\> | - |
| `orElseThrow` | \<E\>(`error`: `E`) => `NonNullable`\<`T`\> | - |

#### Defined in

[core/optional.ts:7](https://github.com/kacper-olszanski/better-optional/blob/faa41243be11113d590b8c27c9fb9dab5cbf6704/lib/core/optional.ts#L7)

## Variables

### Optional

• `Const` **Optional**: [`OptionalType`](modules.md#optionaltype)

#### Defined in

[core/index.ts:45](https://github.com/kacper-olszanski/better-optional/blob/faa41243be11113d590b8c27c9fb9dab5cbf6704/lib/core/index.ts#L45)

