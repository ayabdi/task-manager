// jest.setup.js
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  global.ResizeObserver = ResizeObserver;