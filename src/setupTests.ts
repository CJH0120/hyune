import "@testing-library/jest-dom";

// use observer mock
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();

class IntersectionObserverMock {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe() {
    observeMock();
    const entries: IntersectionObserverEntry[] = [{ isIntersecting: true }] as any;
    this.callback(entries, this as any);
  }

  unobserve() {
    unobserveMock();
  }

  disconnect() {
    disconnectMock();
  }
}

global.IntersectionObserver = IntersectionObserverMock as any;
