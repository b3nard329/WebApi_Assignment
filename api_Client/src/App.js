// heroku : cryptic-fortress-90898
import React, { Component } from 'react';
import './App.css';
import ProfileCard from './ProfileCard';
import Carousal from './Carousal';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      alertVisible_addedSuccess: false,
      name: '',
      profiles: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
    this.setState({ alertVisible_addedSuccess: false });
  }

  getAllCharacters = () => {
    axios
      .get('https://aqueous-reef-22809.herokuapp.com/getallProfile')
      .then(result => {
        this.setState({ profiles: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllCharacters();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://aqueous-reef-22809.herokuapp.com/addProfile?name=${
      this.state.name
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data == 'Not found') {
          this.setState({ alertVisible: true });
        } else {
          this.setState({ alertVisible_addedSuccess: true });
          setTimeout(() => {
            this.setState({ alertVisible_addedSuccess: false });
          }, 1000);

          this.getAllCharacters();
        }
      })
      .catch(error => {
        // alert('Error: ', error);
        this.setState({ alertVisible: true });
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeProfile(my_id) {
    this.setState({
      profiles: this.state.profiles.filter(profile => {
        if (profile.my_id !== my_id) return profile;
      })
    });
    const query = `https://aqueous-reef-22809.herokuapp.com/deleteProfile?my_id=${my_id}`;

    axios
      .get(query)
      .then(result => {
        console.log(result);
        this.getAllCharacters();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let profileCards = this.state.profiles.map(profile => {
      return (
        <Col sm="12" key={profile.my_id}>
          <ProfileCard
            removeProfile={this.removeProfile.bind(this)}
            profile={profile}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container fluid>
          <Carousal id="jumboheader" />

          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Character not found
              </Alert>

              <Alert
                color="success"
                isOpen={this.state.alertVisible_addedSuccess}
                toggle={this.onDismiss}
              >
                Character Added
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <h5>Character List</h5>
                  <Input
                    style={{ width: '1400px', marginLeft: '40px' }}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="eg.Jon Snow"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{profileCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
