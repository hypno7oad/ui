import React from 'react'; // export const Content = props => (<h1>CosmoDog Content</h1>)

export var ContentTitle = function ContentTitle(props) {
  return React.createElement("h3", null, "This is still the default ContentComponent, but with overrides for the Title and Interaction sections");
};
export var ContentInteraction = function ContentInteraction(props) {
  return React.createElement("button", {
    onClick: function onClick() {
      return alert("Hello, ".concat(props.user.displayName));
    }
  }, "This interaction can even access all user data if needed.");
};