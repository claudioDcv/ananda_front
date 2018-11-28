import React, { Component } from 'react';
import { Col, Card, CardBody, Button, CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

import GreenhouseService from '../http/service/GreenhouseService';
import Loader from './Loader';
import DateRange from './DateRange';
import { objectToQuerystring } from '../common/utils';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: null,
            capturedDate: null,
            controls: [],
            unit: 'day',
        };

        this.r = React.createRef();


    }

    componentDidMount() {
        const { match } = this.props;
        GreenhouseService.getPlantById(match.params.id).then(plant => {
            this.setState({ plant, httpSuccess: true });
            // GreenhouseService.getByGreenhouseId(match.params.id).then(e => {
            //     this.setState({ greenhouse, greenhousePlant: e, httpSuccess: true });
            // })
        })


    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handlerSearch = () => {
        const { plant, capturedDate } = this.state;

        const data = {
            plant: plant.id,
            captured_date_from: moment(capturedDate.startDate).format('YYYY-MM-DD'),
            captured_date_to: moment(capturedDate.endDate).format('YYYY-MM-DD'),
        };
        const qs = objectToQuerystring(data);

        GreenhouseService.getControlsByQs(qs).then(controls => {
            this.setState({ controls });
        })
    }

    render() {
        const { plant, capturedDate, controls, unit } = this.state;
        const filteredPH = controls.map(e => ({
            y: e.pH,
            x: new Date(e.captured_date),
        }));

        const filteredTemperature = controls.map(e => ({
            y: e.temperature,
            x: new Date(e.captured_date),
        }));

        return plant ? (
            <Col md={12}>
                <Card key={plant.id}>
                    <CardHeader>
                        <CardTitle>{`${plant.name} (${plant.x}-${plant.y})`}</CardTitle>
                        <CardSubtitle>{plant.code}</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <DateRange value={capturedDate} name="capturedDate" onChange={this.handlerChange} />
                        <Button disabled={capturedDate === null} onClick={this.handlerSearch}>Buscar</Button>
                    </CardBody>
                    <CardBody>
                        <select onChange={this.handlerChange} name="unit" value={unit}>
                            <option value="month">Mes</option>
                            <option value="day">Dia</option>
                            <option value="hour">Hora</option>
                        </select>
                    </CardBody>
                    <CardBody>
                        <Line
                            data={{
                                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                datasets: [{
                                    label: 'PH',
                                    data: filteredPH,
                                    backgroundColor: 'transparent',
                                    borderColor: 'green',
                                    borderWidth: 1,
                                    yAxisID: 'y-axis-1',
                                }, {
                                    label: 'Temperatura',
                                    data: filteredTemperature,
                                    backgroundColor: 'transparent',
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    yAxisID: 'y-axis-2',
                                }]
                            }}
                            options={{
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        time: {
                                            unit,
                                            min: filteredPH[0],
                                            max: filteredPH[filteredPH.length - 1],
                                        }
                                    }],
                                    yAxes: [{
                                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                        display: true,
                                        position: 'left',
                                        id: 'y-axis-1',
                                    }, {
                                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                        display: true,
                                        position: 'right',
                                        id: 'y-axis-2',
            
                                        // grid line settings
                                        gridLines: {
                                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                                        },
                                    }],
                                }
                                
                            }}
                        />
                    </CardBody>
                </Card>
            </Col>
        ) : (<Loader />);
    }
}

export default Plant;