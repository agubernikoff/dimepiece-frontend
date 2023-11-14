export function toCamelCase(input) {
  return input.toLowerCase().replace(/[-_ ](.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}
