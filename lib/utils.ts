export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]) {
  return classes
    .flatMap(c => {
      if (!c) return [];
      if (typeof c === 'string') return [c];
      return Object.entries(c)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => k);
    })
    .join(" ");
}
