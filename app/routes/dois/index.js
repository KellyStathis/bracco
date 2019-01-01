import Route from '@ember/routing/route';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  beforeModel() {
    let result = this._super(...arguments);

    if (this.get('can').cannot('read index')) {
      return this.transitionTo('index');
    }

    return result;
  },

  model(params) {
    params = assign(params, { 
      page: {
        number: params.page,
        size: params.size 
      }
    });

    return this.store.query('doi', params);
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    'resource-type-id': {
      refreshModel: true
    },
    year: {
      refreshModel: true
    },
    registered: {
      refreshModel: true
    },
    'client-id': {
      refreshModel: true
    },
    prefix: {
      refreshModel: true
    },
    'schema-version': {
      refreshModel: true
    },
    source: {
      refreshModel: true
    },
    'link-check-status': {
      refreshModel: true
    }
  }
});
