'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Talkus = require('../lib/');

describe('Talkus', function() {
  var analytics;
  var talkus;
  var options = {
    appId: 'test'
  };

  beforeEach(function() {
    analytics = new Analytics();
    talkus = new Talkus(options);
    analytics.use(Talkus);
    analytics.use(tester);
    analytics.add(talkus);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    talkus.reset();
    sandbox();
  });

  it('should have the right settings', function() {
    var Test = integration('Talkus')
      .global('talkus')
      .option('appId', '');

    analytics.compare(Talkus, Test);
  });

  // XXX: This test must always run last or there may be unexpected test
  // failures, see @nathan for details
  describe('loading', function() {
    it('should load', function(done) {
      analytics.load(talkus, function() {
        analytics.assert(window.talkus);
        done();
      });
    });
  });
});
