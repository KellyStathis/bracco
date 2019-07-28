import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  intl: service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  client: null,
  clients: [],
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchClient(null);
  },

  searchClient(query) {
    if (this.currentUser.get('isAdmin')) {
      this.set('clients', this.store.query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.currentUser.get('isProvider')) {
      this.set('clients', this.store.query('client', { 'query': query, 'provider-id': this.currentUser.get('provider_id'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.set('isDisabled', (client === null) || (client.id === this.get('model.id')));
    this.model.set('targetId', client.id);
  },

  actions: {
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit() {
      this.model.save();
      let count = this.model.get('totalDoiCount');
      this.flashMessages.success('DOI transfer for ' + this.intl.formatNumber(count) + ' DOIs started, the transfer should take about ' + this.intl.formatNumber(Math.ceil(count/5000) + 1) + ' minutes to complete.', {
        timeout: 5000,
        sticky: true
      });
      this.router.transitionTo('clients.show.settings', this.model);
    },
    cancel() {
      this.router.transitionTo('clients.show.dois', this.model);
    }
  }
});