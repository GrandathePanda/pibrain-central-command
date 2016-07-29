import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/app.jsx'
import AddEnvModal from '../imports/ui/add_env_modal.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
  //render(<AddEnvModal />, document.getElementById('ui-testing-target'));
});