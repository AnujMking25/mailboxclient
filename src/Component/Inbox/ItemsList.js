import React from 'react'
import { Row,Col} from 'react-bootstrap'
const ItemsList = (props) => {
    const read=props.read
    // const Navigate=useNavigate()
    console.log(props.read);
    // function onMessagePageHandler(){
    //   Navigate()
      
    //   console.log("Navigate working");
    // }
  return (
    <li key={props.id} style={{listStyle:'none'}}>
      <Row  >
        <Col sm={1} >{read ? '📕': '📖'}</Col>
          <Col sm={3}> <b>{props.from}</b></Col>
          <Col sm={8}>{props.message}</Col>
         
        </Row>
        <hr/>
   </li>
  )
}

export default ItemsList