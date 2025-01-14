import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bar chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{bar-chart}}`);

    assert.dom('h3.panel-title').hasText('Charts by year');
    assert.dom('div.panel-body').hasText('0 20132023');
  });
});
