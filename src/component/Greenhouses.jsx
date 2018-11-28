import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardText, CardBody, CardTitle, CardSubtitle, CardHeader } from 'reactstrap';

import GreenhouseService from '../http/service/GreenhouseService';

class Greenhouses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            greenhouses: [],
        };
    }

    componentDidMount() {
        GreenhouseService.get().then(e => {
            this.setState({ greenhouses: e });
        })
    }

    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handlerGreenhouse() {

    }

    render() {
        const { greenhouses } = this.state;
        return greenhouses.map(e => (
            <Col xs={12} md={6} key={e.id}>
                <Card key={e.id} className="mb-4">
                    <CardHeader>
                        <CardTitle>{`${e.name} (${e.x}-${e.y})`}</CardTitle>
                        <CardSubtitle>{e.code}</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>Plantas <strong>{e.plant_count}</strong></CardText>
                        <Link to={`${this.props.match.url}/${e.id}`}>
                            Ver
                        </Link>
                    </CardBody>
                </Card>
            </Col>
        ));
    }
}

export default Greenhouses;