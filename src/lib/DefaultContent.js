import React from 'react';
import {
  VerticalLayout,
  Panel,
} from "nice-react-layout";

function DefaultContent(props) {
  const {
    user,
    ContentTitle,
    ContentInteraction
  } = props
  return (
    <VerticalLayout>
      <Panel>
        <ContentTitle></ContentTitle>
      </Panel>
      <Panel>
        <ContentInteraction user={user}></ContentInteraction>
      </Panel>
    </VerticalLayout>
  )
}
DefaultContent.defaultProps = {
  user: null,
  ContentTitle: () => <h3>This is a PoC to show that UI components can be loaded dynamically at run time based on tenant configuration data.</h3>,
  ContentInteraction: () => <h3>Hello, world!</h3>
}
export default DefaultContent