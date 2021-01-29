import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let provider = this.modelFor('providers/show');
    let organization = this.store.createRecord('provider', {
      consortium: provider,
      memberType: 'consortium_organization',
      billingInformation: {},
      isActive: true
    });

    return hash({
      provider,
      organization
    });
  }
});
