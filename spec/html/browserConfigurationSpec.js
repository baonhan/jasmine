describe('BrowserConfiguration', function() {
  describe('initial state', function() {
    it('uses query string values for failFast, oneFailurePerSpec, and hideDisabled', function() {
      var config = jasmineUnderTest.browserConfiguration(
        makeQueryString(
          '?failFast=true&oneFailurePerSpec=false&hideDisabled=true'
        )
      );

      expect(config.env).toEqual(
        jasmine.objectContaining({
          failFast: true,
          oneFailurePerSpec: false,
          hideDisabled: true
        })
      );
    });

    it('sets failFast, oneFailurePerSpec, and hideDisabled to undefined when not in the query string', function() {
      var config = jasmineUnderTest.browserConfiguration(makeQueryString(''));

      expect(config.env).toEqual(
        jasmine.objectContaining({
          failFast: undefined,
          oneFailurePerSpec: undefined,
          hideDisabled: undefined
        })
      );
    });
  });

  it('leaves random unset when the query param is unset', function() {
    var config = jasmineUnderTest.browserConfiguration(makeQueryString(''));

    expect(config.env.random).toBeUndefined();
  });

  it('leaves random unset when the query param is empty', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?random=')
    );

    expect(config.env.random).toBeUndefined();
  });

  it('sets random to true when the query param is "true"', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?random=true')
    );

    expect(config.env.random).toBe(true);
  });

  it('sets random to false when the query param is "false"', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?random=false')
    );

    expect(config.env.random).toBe(false);
  });

  it('leaves seed unset when the query param is unset', function() {
    var config = jasmineUnderTest.browserConfiguration(makeQueryString(''));

    expect(config.env.seed).toBeUndefined();
  });

  it('sets seed to the value of the query param', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?seed=12345')
    );

    expect(config.env.seed).toEqual('12345');
  });

  it('sets filterSpecs to true when the spec query param is truthy', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?spec=foo')
    );

    expect(config.filterSpecs).toBe(true);
  });

  it('sets filterSpecs to false when the query param is falsy', function() {
    expect(
      jasmineUnderTest.browserConfiguration(makeQueryString('?')).filterSpecs
    ).toBe(false);
    expect(
      jasmineUnderTest.browserConfiguration(makeQueryString('?spec='))
        .filterSpecs
    ).toBe(false);
  });

  it('creates a specFilter based on the "spec" query param', function() {
    var config = jasmineUnderTest.browserConfiguration(
      makeQueryString('?spec=foo')
    );

    expect(
      config.env.specFilter({
        getFullName: function() {
          return 'spec with foo in the name';
        }
      })
    ).toBe(true);
    expect(
      config.env.specFilter({
        getFullName: function() {
          return 'spec without';
        }
      })
    ).toBe(false);
  });

  function makeQueryString(search) {
    return new jasmineUnderTest.QueryString({
      getWindowLocation: function() {
        return { search: search };
      }
    });
  }
});
