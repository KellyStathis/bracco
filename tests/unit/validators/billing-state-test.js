import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | billing-state', function (hooks) {
  setupTest(hooks);

  test('it works', function (assert) {
    let validator = this.owner.lookup('validator:billing-state');
    assert.ok(validator);
  });
});
