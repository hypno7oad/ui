import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import { UI } from '../../lib';
import { Users } from '../../mocks';
import { HorizontalLayout, VerticalLayout, Panel, View } from 'nice-react-layout';
import './App.css';

function App(_ref) {
  var HeaderText = _ref.HeaderText,
      SelectedUserText = _ref.SelectedUserText,
      selectUserPlaceholder = _ref.selectUserPlaceholder,
      headerHeight = _ref.headerHeight,
      headerUserBoxWidth = _ref.headerUserBoxWidth,
      useSelectedUserState = _ref.useSelectedUserState,
      useContentComponentState = _ref.useContentComponentState,
      useClientCustomizationSate = _ref.useClientCustomizationSate;

  var _useSelectedUserState = useSelectedUserState(),
      _useSelectedUserState2 = _slicedToArray(_useSelectedUserState, 2),
      selectedUser = _useSelectedUserState2[0],
      setSelectedUser = _useSelectedUserState2[1];

  var _useContentComponentS = useContentComponentState(),
      _useContentComponentS2 = _slicedToArray(_useContentComponentS, 2),
      ContentComponent = _useContentComponentS2[0],
      setContentComponent = _useContentComponentS2[1];

  var _useClientCustomizati = useClientCustomizationSate(),
      _useClientCustomizati2 = _slicedToArray(_useClientCustomizati, 2),
      clientCustomizations = _useClientCustomizati2[0],
      setClientCustomizations = _useClientCustomizati2[1];

  if (selectedUser !== null) {
    SelectedUserText = function SelectedUserText() {
      return React.createElement("h5", null, selectedUser.client, ": ", selectedUser.username);
    };
  }

  var handleChange = function handleChange(event) {
    var selectedUser = Users.find(function (user) {
      return user.username === event.target.value;
    });
    setSelectedUser(selectedUser || null);

    if (selectedUser) {
      import("../".concat(selectedUser.clientCustomizations, ".js")).then(function (customizations) {
        if (customizations.Content) setContentComponent(function () {
          return customizations.Content;
        });
        setClientCustomizations(customizations);
      });
    } else {
      setContentComponent(null);
      setClientCustomizations(null);
    }
  };

  return React.createElement(View, null, React.createElement(VerticalLayout, {
    mockup: true
  }, React.createElement(Panel, {
    fixed: true,
    fixedHeight: headerHeight
  }, React.createElement(HorizontalLayout, {
    mockup: true
  }, React.createElement(Panel, {
    centered: true
  }, React.createElement(HeaderText, null)), React.createElement(Panel, {
    fixed: true,
    fixedWidth: headerUserBoxWidth
  }, React.createElement(VerticalLayout, null, React.createElement(Panel, null, React.createElement("h3", null, React.createElement("select", {
    autoFocus: true,
    onChange: handleChange
  }, React.createElement("option", {
    "default": true
  }, selectUserPlaceholder), Users.map(App.mapUserToOption)))), React.createElement(Panel, null, React.createElement(SelectedUserText, null)))))), React.createElement(Panel, {
    centered: true
  }, ContentComponent ? React.createElement(ContentComponent, Object.assign({
    user: selectedUser
  }, clientCustomizations)) : React.createElement(UI.DefaultContent, Object.assign({
    user: selectedUser
  }, clientCustomizations)))));
}

App.mapUserToOption = function (_ref2) {
  var username = _ref2.username,
      displayName = _ref2.displayName;
  return React.createElement("option", {
    value: username,
    key: username
  }, displayName);
};

App.defaultProps = {
  HeaderText: function HeaderText() {
    return React.createElement("h1", null, "Lazy loading of Custom UI Components PoC");
  },
  SelectedUserText: function SelectedUserText() {
    return React.createElement("h5", null, "Please select a user");
  },
  selectUserPlaceholder: 'Select a User:',
  headerHeight: 150,
  headerUserBoxWidth: 200,
  useSelectedUserState: function useSelectedUserState() {
    return useState(null);
  },
  useContentComponentState: function useContentComponentState() {
    return useState(null);
  },
  useClientCustomizationSate: function useClientCustomizationSate() {
    return useState(null);
  }
};
export default App;