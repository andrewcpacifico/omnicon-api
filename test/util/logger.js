describe('logger', function () {
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('should be true', async function () {
    expect(true).to.be.true;
  });
});
