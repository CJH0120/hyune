import { renderHook, act } from "@testing-library/react";

import { useDebounce } from "./index";
describe("useDebounce", () => {
  jest.useFakeTimers();
  it("1초뒤에 값이 바꿔야 한다", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: "initial" },
    });

    // 처음 상태 확인
    expect(result.current).toBeUndefined();

    // 값 변경
    rerender({ value: "updated" });
    act(() => {
      jest.advanceTimersByTime(500); // 500ms 경과
    });

    // 아직 변경되지 않아야 함
    expect(result.current).toBeUndefined();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should call a function after debounce", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current(); // 함수 호출
    });

    // 함수가 호출되지 않아야 함
    expect(callback).not.toHaveBeenCalled();

    // 1000ms 경과 후 확인
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear the timeout when unmounted", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current(); // 함수 호출
    });

    unmount(); // 훅 언마운트

    // 경과 시간 없이 함수가 호출되지 않아야 함
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
