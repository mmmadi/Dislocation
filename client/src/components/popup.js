import Popup from "reactjs-popup";
import React from 'react'
import {RegisterPage} from '../pages/RegisterPage';

export class ControlledPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <a onClick={this.openModal}>
                    Регистрация пользователя
                </a>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div>
                        {/*<a className="close" onClick={this.closeModal}>*/}
                        {/*    &times;*/}
                        {/*</a>*/}
                        <RegisterPage />
                    </div>
                </Popup>
            </div>
        );
    }
}