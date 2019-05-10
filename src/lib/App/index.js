import React, { useState } from 'react'
import {UI} from '../../lib'
import {Users} from '../../mocks'
import {
  HorizontalLayout,
  VerticalLayout,
  Panel,
  View
} from 'nice-react-layout'
import './App.css'

function App({
  HeaderText,
  SelectedUserText,
  selectUserPlaceholder,
  headerHeight,
  headerUserBoxWidth,
  useSelectedUserState,
  useContentComponentState,
  useClientCustomizationSate
}) {

  const [selectedUser, setSelectedUser] = useSelectedUserState()
  const [ContentComponent, setContentComponent] = useContentComponentState()
  const [clientCustomizations, setClientCustomizations] = useClientCustomizationSate()

  if (selectedUser !== null) {
    SelectedUserText = () => (<h5>{selectedUser.client}: {selectedUser.username}</h5>)
  }
  const handleChange = event => {
    const selectedUser = Users.find(user => user.username === event.target.value)
    setSelectedUser(selectedUser || null)

    if (selectedUser) {
      import(`../${selectedUser.clientCustomizations}.js`)
        .then(customizations => {
          if (customizations.Content) setContentComponent(() => customizations.Content)
          setClientCustomizations(customizations)
        })
    } else {
      setContentComponent(null)
      setClientCustomizations(null)
    }
  }

  return (
    <View>
      <VerticalLayout mockup>
        <Panel fixed fixedHeight={headerHeight}>
          <HorizontalLayout mockup>
            <Panel centered>
              <HeaderText></HeaderText>
            </Panel>
            <Panel fixed fixedWidth={headerUserBoxWidth}>
              <VerticalLayout>
                <Panel>
                  <h3>
                    <select autoFocus onChange={handleChange}>
                      <option default>{selectUserPlaceholder}</option>
                      {Users.map(App.mapUserToOption)}
                    </select>
                  </h3>
                </Panel>
                <Panel>
                  <SelectedUserText></SelectedUserText>
                </Panel>
              </VerticalLayout>
            </Panel>
          </HorizontalLayout>
        </Panel>
        <Panel centered>
          {ContentComponent
            ? <ContentComponent user={selectedUser} {...clientCustomizations}></ContentComponent>
            : <UI.DefaultContent user={selectedUser} {...clientCustomizations}></UI.DefaultContent>
          }
        </Panel>
      </VerticalLayout>
    </View>
  )
}
App.mapUserToOption = ({username, displayName}) => (<option
  value={username}
  key={username}
>{displayName}</option>)

App.defaultProps = {
  HeaderText: () => (<h1>Lazy loading of Custom UI Components PoC</h1>),
  SelectedUserText: () => (<h5>Please select a user</h5>),
  selectUserPlaceholder: 'Select a User:',
  headerHeight: 150,
  headerUserBoxWidth: 200,
  useSelectedUserState: () => useState(null),
  useContentComponentState: () => useState(null),
  useClientCustomizationSate: () => useState(null)

}
export default App