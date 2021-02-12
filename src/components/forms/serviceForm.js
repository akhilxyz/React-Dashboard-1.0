import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { CSelect } from '@coreui/react';
import { ServiceName, ServiceDescription, ServicePrice, ServiceDuration } from '../utils/validation'
import { AddService, UpdateService } from 'src/api/service';


class AddEditForm extends React.Component {

    state = {
        id: '',
        name: '',
        description: '',
        duration: '',
        price: '',
        valid: false,
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = async (e) => {
        e.preventDefault()
        console.log("ADD")
        await this.Validation()
        if (this.state.valid == true) {
          let rs = await AddService({
            "name": this.state.name,
            "duration": this.state.duration,
            "description": this.state.description,
            "price": this.state.price, 
          });
          this.props.addItemToState(rs)
          this.props.toggle()
          NotificationManager.info("Service Added Successfully", 'Info', 2000);
        }


        // await this.Validation()
        // if (this.state.validation == true) {
        //     fetch('http://localhost:3003/api/service', {
        //         method: 'put',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             name: this.state.name,
        //             duration: this.state.duration,
        //             description: this.state.description,
        //             price: this.state.price,

        //         })
        //     }).then(response => response.json())
        //         .then(item => {
        //             if (item) {
        //                 this.props.addItemToState(item.data)
        //                 this.props.toggle()
        //                 NotificationManager.info("Service Added Successfully", 'Info', 2000);
        //             }
        //             else {
        //                 this.props.toggle()
        //                 NotificationManager.error("Something Went Wrong", 'Error', 2000);
        //             }
        //         })
        //         .catch(err => console.log(err))
        // }
    }

    submitFormEdit = async (e) => {
        e.preventDefault()
        await this.Validation()
        if (this.state.valid == true) {
          let rs = await UpdateService({
            "id": this.state.id,
            "duration": this.state.duration,
            "name": this.state.name,
            "description": this.state.description,
            "price": this.state.price,
          });
          console.log('yip',rs)
          this.props.updateState(rs[0])
          this.props.toggle()
          NotificationManager.info("Service Updated Successfully", 'Info', 2000);
        }
    }

        // await this.Validation()
        // if (this.state.validation == true) {
        //     fetch('http://localhost:3003/api/service/update', {
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             id: this.state.id,
        //             duration: this.state.duration,
        //             name: this.state.name,
        //             description: this.state.description,
        //             price: this.state.price,
        //         })
        //     }).then(response => response.json())
        //         .then(item => {
        //             console.log('item', item.data)
        //             if (item) {
        //                 this.props.updateState(item.data[0])
        //                 this.props.toggle()
        //                 NotificationManager.info("Service Updated Successfully", 'Info', 2000);
        //             } else {
        //                 this.props.toggle()
        //                 NotificationManager.error("Something Went Wrong", 'Error', 2000);
        //             }
        //         })
        //         .catch(err => console.log(err))
        // }
    // }

    Validation = () => {
        console.log("VAL")
        if (ServiceName(this.state.name)
            && ServiceDescription(this.state.description)
            && ServicePrice(this.state.price)
            && ServiceDuration(this.state.duration))
            {this.setState({ valid: true })}
    }

    componentDidMount() {
        if (this.props.item) {
            const { id, name, description, price, duration } = this.props.item
            this.setState({ id, name, description, price, duration })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="price" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price} />
                </FormGroup>
                <FormGroup>
                    <Label for="duration">Duration</Label>
                    <CSelect custom size="lg" name="selectLg" id="selectLg" value={this.state.duration} onChange={(e) => this.setState({ duration: e.target.value })}>
                        <option value="">Select Duration</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 year">1 year</option>
                        <option value="2 year">2 year</option>
                        <option value="4 year">4 year</option>
                    </CSelect>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm