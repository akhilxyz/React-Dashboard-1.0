import { Fab, IconButton } from '@material-ui/core'
import { Add, BorderColor } from '@material-ui/icons'
import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../../Actions/company'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
      const label = this.props.buttonLabel
      let button = ''
      let title = ''

      if(label === 'Edit'){
        button = <IconButton color="primary"
                    aria-label="edit item"
                    onClick={this.toggle}
                    component="span">
                    <BorderColor style={{fontSize:"14px",color:"#c9f6ff"}} />
                </IconButton>
        title = 'Edit'
      } else {
        button = <Fab size="small" 
                    style={{ backgroundColor: "#4a5054", 
                    color: "white", outline: "none", 
                    margin:"10px" }}
                    onClick={this.toggle}
                    aria-label="add-button">
                    <Add />
                </Fab>
        title = 'Add'
      }
      
    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm