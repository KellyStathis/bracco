import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import { w } from '@ember/string';

export default Ability.extend({
  currentUser: service(),

  canViewHealth: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canViewState: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canSource: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canTransfer: computed('currentUser.role_id', 'model.client.id', 'model.query.client-id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.client.id')) || w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.client-id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
        case 'provider_admin':
          return true;
        default:
          return false;
      }
    }
  }),
  canUpdate: computed('currentUser.role_id', 'model.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
      }
    }
  }),
  canUpload: computed('currentUser.role_id', 'currentUser.client_id', 'model.query.client-id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.client-id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.query.client-id');
      default:
        return false;
      }
    }
  }),
  canCreate: computed('currentUser.role_id', 'currentUser.client_id', 'model.query.client-id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.query.client-id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.query.client-id');
      default:
        return false;
      }
    }
  }),
  canDelete: computed('currentUser.role_id', 'model.client.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canModify: computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.client.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return this.get('currentUser.client_id') === this.get('model.client.id');
        default:
          return false;
      }
    }
  }),
  canEdit: computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function () {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.get('model.client.id'))) {
      return false;
    } else {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return this.get('currentUser.client_id') === this.get('model.client.id');
        default:
          return false;
      }
  }
  }),
  canForm: computed('currentUser.role_id', 'currentUser.client_id', 'model.client.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'client_admin':
        return this.get('currentUser.client_id') === 'demo.datacite' && this.get('currentUser.client_id') === this.get('model.client.id');
      default:
        return false;
    }
  }),
  canDetail: computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.client.id', 'model.provider.id', 'model.state', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      case 'user':
        return this.get('model.state') === 'findable';
      default:
        return false;
    }
  }),
  canRead: computed('currentUser.role_id', 'currentUser.provider_id', 'currentUser.client_id', 'model.client.id', 'model.provider.id', 'model.state', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.provider.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.client.id');
      case 'user':
        return this.get('model.state') === 'findable';
      default:
        return this.get('model.state') === 'findable';
    }
  })
});
