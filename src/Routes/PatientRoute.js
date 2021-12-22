import React from 'react'
import {Route} from 'react-router-dom'
function PatientRoute({ component: Component, ...rest }) {
    return (
        <Route
        {...rest}
        render={(props) => (
          <div>
          <Component {...props} />
        </div> 
        )}
      />
    )
}

export default PatientRoute
