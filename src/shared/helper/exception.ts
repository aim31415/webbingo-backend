import { UniqueConstraintViolationException } from '@mikro-orm/core';

export const isUniqueConstraintViolation = (
  exception: any,
): exception is UniqueConstraintViolationException => {
  return (
    (exception as UniqueConstraintViolationException).name ===
    'UniqueConstraintViolationException'
  );
};
