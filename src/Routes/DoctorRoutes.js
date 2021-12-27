import React from 'react'
import {Route} from 'react-router-dom'
function DoctorRoutes({ component: Component, ...rest }) {
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

export default DoctorRoutes
