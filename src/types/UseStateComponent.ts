import { Dispatch, SetStateAction } from 'react';

type UseStateComponent<T, U = T> = {
  current: T;
  update: (value: U) => void;
};

/** Same grouping type as the UseStateComponent type, with the difference,
 * that here the update function is directly linked with the useState variable. */
type DirectUseStateComponent<T> = {
  current: T;
  update: Dispatch<SetStateAction<T>>;
};

export type { DirectUseStateComponent, UseStateComponent };
