//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Col
} from 'reactstrap';

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let {
      my_id,
      name,
      gender,
      culture,
      born,
      aliases,
      character_image
    } = this.props.profile;
    return (
      <div>
        <Table id="tables">
          <thead>
            <tr>
              <th>
                <center>ID</center>
              </th>
              <th>
                <center>Profile</center>
              </th>
              <th>
                <center>Name</center>
              </th>
              <th>
                <center>Gender</center>
              </th>
              <th>
                <center>Culture</center>
              </th>
              <th>
                <center>Born</center>
              </th>
              <th>
                <center>Aliases</center>
              </th>
              <th>
                <center>Action</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={this.toggle}>
              <td style={{ width: '20px' }}>{my_id}</td>
              <td style={{ width: '200px' }}>
                <img width="200px" height="300px" src={character_image} />
              </td>
              <td style={{ width: '180px' }}>{name}</td>
              <td style={{ width: '180px' }}>{gender}</td>
              <td style={{ width: '180px' }}>{culture}</td>
              <td style={{ width: '180px' }}>{born}</td>
              <td style={{ width: '180px' }}>{aliases}</td>

              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeProfile(my_id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          </tbody>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>{name}</ModalHeader>
            <ModalBody>
              <div class="row">
                <Col sm="6">
                  <img
                    style={{ marginRight: '10px' }}
                    width="250px"
                    height="300px"
                    src={character_image}
                  />
                </Col>

                <Col sm="6">
                  <ListGroup style={{ marginLeft: '10px' }}>
                    <ListGroupItem>
                      <b>Gender</b> : {gender}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Culture</b> : {culture}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Born</b> : {born}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Description</b>
                    </ListGroupItem>
                    <ListGroupItem
                      style={{ fontSize: '12px', textAlign: 'left' }}
                    >
                      {aliases}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </div>
            </ModalBody>
          </Modal>
        </Table>
      </div>
    );
  }
}

export default ProfileCard;
