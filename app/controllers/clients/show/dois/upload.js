import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit(doi) {
      doi.set('event', this.setEvent(doi.get('state')));

      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('clients.show.dois.show', doi.client.id, doi);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois', this.get('model'));
    }
  }
});
