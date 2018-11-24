import Ember from 'ember';
const softwareList = [
  'CKAN',
  'Dataverse',
  'DSpace',
  'EPrints',
  'Fedora',
  'Nesstar',
  'Open Journal Systems (OJS)',
  'Opus',
  'Samvera',
  'Other'
]

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  client: null,
  new: false,
  repository: null,
  repositories: [],
  softwareList,
  softwares: softwareList,

  selectRepository(repository) {
    if (repository) {
      let self = this;
      this.get('store').findRecord('repository', repository.id).then(function(repo) {
        self.set('repository', repo)
        self.get('client').set('repository', repo);
        self.get('client').set('name', repo.get('repositoryName'));
        self.get('client').set('description', repo.get('description'));
        self.get('client').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          } 
          self.get('client').set('software', software.capitalize());
        }
      });
    } else {
      this.get('client').set('repository', null);
    }
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function(software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.get('client').set('software', software);
    this.set('softwares', softwareList);
  },
  reset() {
    this.set('client', null);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let provider = this.get('store').peekRecord('provider', model.get('otherParams.provider-id'));
      this.set('client', this.get('store').createRecord('client', { provider: provider, symbol: provider.id.toUpperCase() + '.' }));
      this.set('new', true);
    },
    searchRepository(query) {
      this.set('repositories', this.get('store').query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(client) {
      let self = this;
      client.save().then(function(client) {
        self.get('router').transitionTo('clients.show.settings', client.id);
        self.set('new', false);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.get('client').rollbackAttributes();
      this.reset();
    },
    searchSoftware(query) {
      this.searchSoftware(query);
    },
    selectSoftware(software) {
      this.selectSoftware(software);
    }
  }
});
