var integration = require('@segment/analytics.js-integration');

var Talkus = module.exports = integration('Talkus')
    .global('talkus')
    .option('appId', '')
    .tag('<script src="//www.talkus.io/plugin.beta.js">');

Talkus.prototype.initialize = function() {
    var self = this;
    var options = this.options;
    this.load(function() {
        window.talkus('init', options.appId);
        self.ready();
    });
}

Talkus.prototype.loaded = function() {
    return !!window.talkus;
};

Talkus.prototype.identify = function(identify) {
    var traits = identify.traits({username: 'name'});
    window.talkus('init', this.options.appId, traits);
};
