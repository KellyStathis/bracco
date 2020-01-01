import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  can: service(),
  headData: service(),

  model() {
    let self = this;
    return this.store.findRecord('doi', this.modelFor('repositories/show/dois/show').get('id'), { include: 'repository' }).then(function(doi) {
      if (doi.titles) {
        set(self, 'headData.title', null);
      }
      if (doi.descriptions) {
        set(self, 'headData.description', null);
      }

      return doi;
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  // afterModel() {
  //   if (this.get('can').cannot('view doi', this.modelFor('repositories/show/dois/show'))) {
  //     return this.transitionTo('index');
  //   }
  // }
});