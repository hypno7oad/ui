import React from 'react';
import { VerticalLayout, Panel } from "nice-react-layout";

function DefaultContent(props) {
  var user = props.user,
      ContentTitle = props.ContentTitle,
      ContentInteraction = props.ContentInteraction;
  return React.createElement(VerticalLayout, null, React.createElement(Panel, null, React.createElement(ContentTitle, null)), React.createElement(Panel, null, React.createElement(ContentInteraction, {
    user: user
  })));
}

DefaultContent.defaultProps = {
  user: null,
  ContentTitle: function ContentTitle() {
    return React.createElement("h3", null, "This is a PoC to show that UI components can be loaded dynamically at run time based on tenant configuration data.");
  },
  ContentInteraction: function ContentInteraction() {
    return React.createElement("h3", null, "Hello, world!");
  }
};
export default DefaultContent;