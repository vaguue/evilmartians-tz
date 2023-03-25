import { useMemo } from 'react';
import { nanoid } from 'nanoid'

export default function useId() {
  const id = useMemo(() => nanoid(10), []);
  return id;
}
