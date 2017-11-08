import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';
import ENV from 'bracco/config/environment';

moduleForAcceptance('Acceptance | user | client', {
  beforeEach: function () {
    this.application.register('service:mock-user', Ember.Service.extend({
      uid: (ENV.USER_API_URL === "https://profiles.datacite.org/api") ? '0000-0002-1825-0097' : '0000-0001-5489-3594',
      name: 'Josiah Carberry',
      role_id: 'user'
    }));
    this.application.inject('adapter', 'currentUser', 'service:mock-user');
    this.application.inject('ability', 'currentUser', 'service:mock-user');
    this.application.inject('route', 'currentUser', 'service:mock-user');
    this.application.inject('component', 'currentUser', 'service:mock-user');
    this.application.inject('helper', 'currentUser', 'service:mock-user');
  }
});

test('visiting client AWI', function(assert) {
  visit('/clients/tib.awi');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI settings', function(assert) {
  visit('/clients/tib.awi/settings');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI users', function(assert) {
  visit('/clients/tib.awi/users');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI prefixes', function(assert) {
  visit('/clients/tib.awi/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI dois', function(assert) {
  visit('/clients/tib.awi/dois');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});
