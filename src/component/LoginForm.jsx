import React, { Component } from 'react';

import { Col, Card, CardBody, Button, CardHeader, FormGroup, Label, Input  } from 'reactstrap';

import { storageEmail } from '../common/utils';
import AuthService from '../http/service/AuthService';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: storageEmail(),
            username: '',
            password: '',
            errorList: [],
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerLogin = this.handlerLogin.bind(this);
    }

    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handlerLogin() {
        const { username, password } = this.state;
        const s = this;
        AuthService.login({ username, password }).then(e => {
            s.setState({ errorList: [], email: e.email }, () => {
                
                const p = s.props;
                p.history.push('/greenhouses');
            });
        }).catch(errorList => {
            this.setState({ errorList });
        });
    }

    buttonLoginDisabled() {
        const { username, password } = this.state;
        return username === '' || password === '';
    }

    render() {
        const { username, password, errorList } = this.state;
        return (
            <Col>
                <Card>
                    <CardHeader>Inicio de Sesión</CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label>Nombre de usuario</Label>
                            <Input name="username" value={username} onChange={this.handlerChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input name="password" value={password} onChange={this.handlerChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button disabled={this.buttonLoginDisabled()} onClick={this.handlerLogin} >Ingresar</Button>
                            <ul>
                                {errorList.map((e, i) => (<li key={i}>{e}</li>))}
                            </ul>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default LoginForm;