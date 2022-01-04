export function callAllEventHandlers(
  ...fns: (((event: unknown, ...args: unknown[]) => void) | undefined)[]
) {
  return (event: unknown, ...args: unknown[]) =>
    fns.some((fn) => {
      if (fn) {
        fn(event, ...args);
      }

      if (!typecastToAny(event)) return false;

      return (
        event.preventUptabDefault ||
        (Object.prototype.hasOwnProperty.call(event, 'nativeEvent') &&
          event.nativeEvent.preventUptabDefault)
      );
    });
}

function typecastToAny(t: any): t is any {
  return true;
}
