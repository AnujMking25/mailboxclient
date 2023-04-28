import React from 'react'
import { Row,Col} from 'react-bootstrap'
const ItemsList = (props) => {
    
  return (
    // <li>
    <>
      <Row>
          <Col sm={3}> <b>{props.from}</b></Col>
          <Col sm={9}> {props.message}</Col>
        </Row>
        <hr/>
        </>
  //  </li>
  )
}

export default ItemsList