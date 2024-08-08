import { render, screen, act, renderHook } from "@testing-library/react";

import { useWindowSize } from "./index";

describe("useWindowSize 훅", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    global.innerWidth = 1024;
    global.innerHeight = 768;
    global.dispatchEvent = jest.fn();
  });

  it("초기 렌더링 시 현재 윈도우 100ms 뒤 크기를 반환해야 한다", () => {
    const { result } = renderHook(() => useWindowSize());
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("윈도우 크기 변경 시 1초뒤 상태가 바로 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useWindowSize(1000));

    act(() => {
      global.innerWidth = 800;
      global.innerHeight = 3000;
      global.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual({ width: 0, height: 0 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toEqual({ width: 800, height: 3000 });
  });

  it("윈도우 크기 변경 시 상태가 바로 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useWindowSize(0));

    act(() => {
      global.innerWidth = 1000;
      global.innerHeight = 6000;
      global.dispatchEvent(new Event("resize"));
      jest.advanceTimersByTime(0);
    });

    expect(result.current).toEqual({ width: 1000, height: 6000 });
  });
});
