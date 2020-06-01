import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class AddOrEditGifts extends Component {

  emptyGift = {
    giftName: "",
    giftDescription: "",
    giftPrice:"",
    giftWebsite:"",
    giftPicture:"" 
  };

  constructor(props) {
    super(props);
    this.state = { 
      item: this.emptyGift,
      id : this.props.match.params.id,
      put: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
    this.getGiftInfo();
    }
  
  }
async getGiftInfo(){
try {
 const gift= await axios.get(`https://cors-anywhere.herokuapp.com/https://matreshka-database.herokuapp.com/book_store/v1/gifts/${this.state.id}`)
  this.setState({item:gift.data});}
  catch(error){console.log(error)};
  this.setState({put:true})
}


  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();

if(this.state.put===true){
  axios.put(`https://cors-anywhere.herokuapp.com/https://matreshka-database.herokuapp.com/book_store/v1/gifts/${this.state.id}`, this.state.item)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }

  else{
      axios.post('https://cors-anywhere.herokuapp.com/https://matreshka-database.herokuapp.com/book_store/v1/gifts/', this.state.item)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ item: this.emptyGift})

  }
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Gifts' : 'Add Gifts'}</h2>;
    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="giftName">Gift name</Label>
            <Input type="text" name="giftName" id="giftName" value={item.giftName || ''}
                   onChange={this.handleChange} autoComplete="giftName"/>
          </FormGroup>
          <FormGroup>
            <Label for="giftDescription">Gift description</Label>
            <Input type="text" name="giftDescription" id="giftDescription" value={item.giftDescription || ''}
                   onChange={this.handleChange} autoComplete="giftDescription"/>
          </FormGroup>
          <FormGroup>
            <Label for="giftPrice">Gift price</Label>
            <Input type="text" name="giftPrice" id="giftPrice" value={item.giftPrice || ''}
                   onChange={this.handleChange} autoComplete="giftPrice"/>
          </FormGroup>
          <FormGroup>
            <Label for="giftWebsite">Gift website</Label>
            <Input type="text" name="giftWebsite" id="giftWebsite" value={item.giftWebsite || ''}
                   onChange={this.handleChange} autoComplete="giftWebsite"/>
          </FormGroup>
          <FormGroup>
            <Label for="giftPicture">Gift picturee</Label>
            <Input type="text" name="giftPicture" id="giftPicture" value={item.giftPicture || ''}
                   onChange={this.handleChange} autoComplete="giftPicture"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
          </FormGroup>
         
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(AddOrEditGifts);