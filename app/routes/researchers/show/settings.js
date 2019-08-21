import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let self = this;
    return this.store.findRecord('researcher', this.modelFor('researchers/show').get('id')).then(function(researcher) {
      return researcher;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  afterModel() {
    if (this.can.cannot('read researcher', this.modelFor('researchers/show'))) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
