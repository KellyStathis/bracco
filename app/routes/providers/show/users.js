import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  perPage: 25,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    let provider = this.modelFor('providers/show');
    if (provider.get('id') === 'sandbox') {
      params = Ember.merge(params, { 'sandbox': true });
    } else {
      params = Ember.merge(params, { 'provider-id': this.modelFor('providers/show').get('id') });
    }
    return this.findPaged('user', params);
  },

  afterModel() {
    if (!this.can('read provider', this.modelFor('providers/show'))) {
      //let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    },
    refreshCurrentRoute(){
      this.refresh();
    }
  }
});
