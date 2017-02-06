import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session:     service('session'),
  currentUserSer: service('current-user'),
  model() {
    var self = this;
    if (this.get('session.isAuthenticated')) {
      return this._loadCurrentUser().then((user) => {
        return user;
      });
    }
  },
  sessionAuthenticated() {
    this._super(...arguments);
    // this._loadCurrentUser().catch(() => this.get('session').invalidate());
    this.refresh();
  },
  _loadCurrentUser() {
    return this.get('currentUserSer').load();
  }
});
