jasmineRequire.browserConfiguration = function(j$) {
  function browserConfiguration(queryString) {
    /**
     * Filter which specs will be run by matching the start of the full name against the `spec` query param.
     */
    var specFilter = new j$.HtmlSpecFilter({
        filterString: function() {
          return queryString.getParam('spec');
        }
      }),
      envConfig = {
        specFilter: function(spec) {
          return specFilter.matches(spec.getFullName());
        }
      },
      random,
      seed;

    ['failFast', 'oneFailurePerSpec', 'hideDisabled'].forEach(function(k) {
      envConfig[k] = queryString.getParam(k);
    });

    random = queryString.getParam('random');
    if (random !== undefined && random !== '') {
      envConfig.random = random;
    }

    seed = queryString.getParam('seed');
    if (seed) {
      envConfig.seed = seed;
    }

    return {
      env: envConfig,
      filterSpecs: !!queryString.getParam('spec')
    };
  }

  return browserConfiguration;
};
