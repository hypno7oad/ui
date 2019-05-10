import React from 'react'
// export const Content = props => (<h1>CosmoDog Content</h1>)
export const ContentTitle = props => (<h3>This is still the default ContentComponent, but with overrides for the Title and Interaction sections</h3>)
export const ContentInteraction = props => (<button onClick={() => alert(`Hello, ${props.user.displayName}`)}>This interaction can even access all user data if needed.</button>)