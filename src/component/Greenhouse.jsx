import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardHeader, Badge } from 'reactstrap';
import { Link } from "react-router-dom";

import GreenhouseService from '../http/service/GreenhouseService';
import { createRange } from '../common/utils';
import Loader from './Loader';

class Greenhouse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            httpSuccess: false,
            greenhouse: {},
            greenhousePlant: [],
        };
    }

    componentDidMount() {
        const { match } = this.props;
        GreenhouseService.getById(match.params.id).then(greenhouse => {
            GreenhouseService.getByGreenhouseId(match.params.id).then(e => {
                this.setState({ greenhouse, greenhousePlant: e, httpSuccess: true });
            })
        })
    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    getNotAsignedPlant(list) {
        return list.filter(e => e.x === 0 && e.y === 0);
    }
    getPlant(list, x, y) {
        const { greenhouse } = this.state;
        const plant = list.find(e => e.x === x && e.y === y);
        return plant ? (
            <Link to={`${this.props.match.url}/plant/${plant.id}`}
                key={y}
                className="ananda-greenhouse-grid-y"
                style={{ width: `${(100 / greenhouse.y)}%` }}
            >
                <div className="ananda-planter">
                    {plant.id}<br />{plant.name}
                </div>
            </Link>

        ) : (
                <div key={y} className="ananda-greenhouse-grid-y" style={{ width: `${(100 / greenhouse.y)}%` }}>
                    <div className="ananda-planter ananda-planter-void">{x + 1}-{y + 1}</div>
                </div>
            );
    }

    render() {
        const { greenhouse, greenhousePlant, httpSuccess } = this.state;
        const e = greenhouse;
        return httpSuccess ? (
            <Col md={12}>
                <Card key={greenhouse.id}>
                    <CardHeader>
                        <CardTitle>{`${greenhouse.name} (${greenhouse.x}-${greenhouse.y})`}</CardTitle>
                        <CardSubtitle>{greenhouse.code}</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <p>Plantas <strong>{greenhouse.plant_count}</strong></p>
                        <Row container xs={12} md={12}>
                            {this.getNotAsignedPlant(greenhousePlant).map(plant => (
                                <Col key={plant.id} xs={12} sm={3} md={2}>
                                    <Link key={plant.id} to={`${this.props.match.url}/plant/${plant.id}`}>
                                        <Badge color="success">({plant.id}) {plant.name}</Badge >
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <div className="ananda-greenhouse-grid">
                            {createRange(greenhouse.x).map(x => (
                                <div
                                    key={x}
                                    className="ananda-greenhouse-grid-x"
                                    style={{ width: `${(e.y * 100)}px` }}
                                >
                                    {createRange(e.y).map(y => this.getPlant(greenhousePlant, x, y))}
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        ) : (<Loader />);
    }
}

export default Greenhouse;