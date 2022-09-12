import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | index-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{index-info}}`);
    
    let currentYear = new Date().getFullYear();
    let startDate = (currentYear - 10).toString();
    let endDate = currentYear.toString();

    assert
      .dom(this.element)
      .hasText(
        `Members by year 0 ${startDate+endDate} Repositories by year 0 ${startDate+endDate} DOIs by year 0 in ${currentYear.toString()} ${startDate+endDate}`
      );
  });
});
