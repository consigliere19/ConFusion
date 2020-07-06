import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
        
    }
    renderDish(dish) {
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
    renderComments(dish) {
        
        if (dish!=null && dish.comments != null){
                const comment = dish.comments.map((comm) => {
                    const date=new Date(comm.date);
                    const months={
                        0:"Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"Jun",6:"Jul",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec"
                    }
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
                    <div><h4>Comments</h4>{comment}</div>
                );
            
        }
        else
            return(
                <div></div>
            );
    }
    render(){
        console.log(this.props.selectedDish)
        return(
            <div className="container">
            <div className="row">
              <div  className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.selectedDish)}
              </div>
              <div  className="col-12 col-md-5 m-1">
                {this.renderComments(this.props.selectedDish)}
              </div>
            </div>
            </div>
        )
    }
}

export default DishDetail;