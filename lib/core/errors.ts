export namespace errors {
  const suggestionText =
    'If you want to do this on purpose use Optional.ofNullish(). ';
  export const notPresent = 'Value is not present';
  export const createError = (valueType: 'nullish' | 'null' | 'undefined') =>
    `Cannot create an optional value from a ${valueType} value. ${valueType === 'nullish' ? suggestionText : ''}If you want to create an empty optional, use Optional.empty() instead.`;
}
