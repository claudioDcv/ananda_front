import React, { Component } from 'react';
import { Col, Card, CardBody, Input, FormGroup, Button, CardTitle, CardSubtitle, CardHeader, Label } from 'reactstrap';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import GreenhouseService from '../http/service/GreenhouseService';
import Loader from './Loader';
import DateRange from './DateRange';
import { objectToQuerystring, slugify } from '../common/utils';
import Select from './Select';

class CreatePlant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            plantType: null,
            options: [
                { value: 1, label: 'Uno' },
                { value: 2, label: 'Dos' },
                { value: 3, label: 'Tres' },
                { value: 4, label: 'Cuatro' },
            ]
        };
    }

    componentDidMount() {
    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { options, plantType, name } = this.state;
        return (
            <Col md={12}>
                <Card>
                    <CardHeader>
                        Nueva Planta
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label>Tipo</Label>
                            <Select
                                value={plantType}
                                options={options}
                                name="plantType"
                                onChange={this.handlerChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input
                                value={name}
                                name="name"
                                onChange={this.handlerChange}
                            />
                            <small className="text-success">{slugify(name)}</small>
                        </FormGroup>
                        <FormGroup>
                            <Button block color="success">Guardar</Button>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        );
        // : (<Loader />);
    }
}

export default CreatePlant;