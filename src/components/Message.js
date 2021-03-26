import React from 'react'
import {Alert} from "react-bootstrap"
const Message = ({va,err}) => {
    return (
        <Alert variant={va}>
            {err}
        </Alert>
    )
}
Message.defaultProps = {
  variant :"info",
}

export default Message
