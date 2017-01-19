// we are outside describe but this works as mocha has a root describe
//global
let cleanup;
beforeEach(() => {
  cleanup = jsdom();
});
afterEach(() => {
  cleanup()
});
