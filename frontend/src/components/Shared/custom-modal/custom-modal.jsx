import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { CustomLoader } from "../custom-loader/custom-loader";

import CrossIMG from "images/circled-cross.svg";

import "./custom-modal.scss";

export const CustomModal = ({
    onClosed,
    isOpen,
    isLoading = false,
    renderHeaderBtns,
    children,
    vh = 60,
    vw = 60,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClosed}
            className="custom-modal"
            style={{ height: `${vh}vh`, width: `${vw}vw` }}
        >
            <ModalHeader>
                <div className="custom-modal-header">
                    <div>
                        {renderHeaderBtns &&
                            typeof renderHeaderBtns === "function" &&
                            renderHeaderBtns()}
                    </div>
                    <div>
                        <img src={CrossIMG} onClick={onClosed} />
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <CustomLoader isLoading={isLoading} />
                {children}
            </ModalBody>
        </Modal>
    );
};
