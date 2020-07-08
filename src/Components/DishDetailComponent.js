import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem ,Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input,  Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';    
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);

    
        this.handleSubmit = this.handleSubmit.bind(this);
    
        
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12} >
                                <Control.select model=".rating" name="rating" 
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            
                            <Row className="form-group" >
                                <Label htmlFor="username" md={12}>Your name</Label>
                                <Col md={12} >
                                    <Control.text model=".username" id="username" name="username"  
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    </Col>
                            </Row>
                            <Row className="form-group" >
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6" 
                                        className="form-control" />
                                </Col>
                            </Row>
                           
                            <Button type="submit" value="submit" color="primary" >Submit</Button>
                            
                        </LocalForm>
                     
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
            </div>
        );
    }
}

    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
    function RenderComments({comments}) {
        
        if (comments != null){
                const comment = comments.map((comm) => {
                    const date=new Date(comm.date);
                    return(
                        <div key={comm.id}>
                            <ul className="list-unstyled">
                                <li>{comm.comment}</li>
                                <li>-- {comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                            </ul>
                        </div>
                    )
                });
                return (
                    <div><h4>Comments</h4>{comment}<CommentForm /></div>
                );
            
        }
        else
            return(
                <div><CommentForm /></div>            
            );
    }
    const  DishDetail = (props) =>{
        //console.log(this.props.selectedDish)
        if(props.dish!=null){
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
        }
        else{
            return(
                <div></div>
            )
        }
    }


export default DishDetail;