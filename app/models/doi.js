import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  confirmDoi: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', function() {
        return this.get('model').get('mode') !== 'delete';
      })
    }),
    validator('confirmation', {
      on: 'doi',
      message: 'DOI does not match',
      disabled: Ember.computed('model.mode', function() {
        return this.get('model').get('mode') !== 'delete';
      })
    })
  ],
  suffix: [
    validator('presence', {
      presence: true,
      message: 'The DOI suffix can\'t be blank.',
      disabled: Ember.computed('model.mode', function() {
        return true;
        // return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    }),
    validator('format', {
      regex: /^[-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.',
      disabled: Ember.computed('model.mode', function() {
        return true;
        //return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    }),
    validator('unique-doi', {
      dependentKeys: ['model.prefix'],
      disabled: Ember.computed('model.mode', function() {
        return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    })
  ],
  url: [
    validator('format', {
      type: 'url',
      allowBlank: true,
      message: 'Please enter a valid URL that the DOI should resolve to.'
    }),
    validator('presence', {
      presence: true,
      message: 'Please enter a valid URL that the DOI should resolve to.',
      disabled: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    }),
    validator('valid-url', {
      allowBlank: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  creator: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  title: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  publisher: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  published: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["upload", "modify"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      disabled: Ember.computed('model.mode', function() {
        return !["upload", "modify"].includes(this.get('model').get('mode'))
      })
    })
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: false
  }),
  client: DS.belongsTo('client', {
    async: false
  }),
  'resource-type': DS.belongsTo('resource-type', {
    async: false
  }),

  identifier: DS.attr('string'),
  doi: DS.attr('string'),
  confirmDoi: DS.attr('string', { defaultValue: null }),
  prefix: DS.attr('string'),
  suffix: DS.attr('string'),
  url: DS.attr('string'),
  media: DS.attr(),
  creator: DS.attr(),
  title: DS.attr('wrapped'),
  publisher: DS.attr('string'),
  published: DS.attr('string'),
  description: DS.attr('wrapped'),
  license: DS.attr('string'),
  xml: DS.attr('xml'),
  resourceTypeSubtype: DS.attr('string'),
  version: DS.attr('string'),
  metadataVersion: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  state: DS.attr('string'),
  event: DS.attr('string'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),

  mode: DS.attr('string'),

  isDraft: Ember.computed('state', function() {
    return this.get('state') === 'draft';
  }),

  schemaVersionString: Ember.computed('schemaVersion', function() {
    if (this.get('schemaVersion')) {
      return this.get('schemaVersion').split("-").get("lastObject");
    } else {
      return null;
    }
  })
});
