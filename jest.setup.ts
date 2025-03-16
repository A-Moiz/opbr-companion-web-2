// silence console errors, warnings, and logs during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
