import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

let dispatchFn = vi.fn();
const mockState = { any: 'state' } as const;

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchFn,
  useSelector: (selector: (state: unknown) => unknown) => selector(mockState),
}));

import { useAppDispatch, useAppSelector } from './index';

describe('Hooks: typed redux hooks', () => {
  beforeEach(() => {
    dispatchFn = vi.fn();
  });

  it('useAppDispatch should return dispatch from react-redux', () => {
    const { result } = renderHook(() => useAppDispatch());
    expect(result.current).toBe(dispatchFn);
  });

  it('useAppSelector should pass selector into react-redux useSelector', () => {
    const selector = vi.fn((state: unknown) => state);

    const { result } = renderHook(() =>
      useAppSelector(selector as Parameters<typeof useAppSelector>[0])
    );

    expect(selector).toHaveBeenCalledTimes(1);
    expect(selector).toHaveBeenCalledWith(mockState);
    expect(result.current).toEqual(mockState);
  });
});
