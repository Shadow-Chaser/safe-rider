import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const OptionCard = (props) => {
    const {name, image, id} = props.option;

    const history = useHistory();
    const handleOption = () => {
        history.push(`/option/${id}`);
    }

    return (
        <div className='m-3'>
            <Card onClick={()=> handleOption(id)} style={{ width: '12rem' }} >
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OptionCard;