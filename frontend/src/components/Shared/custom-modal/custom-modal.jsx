import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import concatClasses from "classnames";

import { CustomLoader } from "../custom-loader/custom-loader";

import CrossIMG from "images/circled-cross.svg";

import "./custom-modal.scss";

export const CustomModal = ({
    onClosed,
    isOpen,
    isLoading = false,
    renderHeaderBtns,
    children,
    height = "60vh",
    width = "60vw",
    className,
    crossIcon = CrossIMG,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClosed={onClosed}
            className={concatClasses("custom-modal", className)}
            style={{ height: height, width: width }}
        >
            <ModalHeader>
                <div className="custom-modal-header">
                    <div>
                        {renderHeaderBtns &&
                            typeof renderHeaderBtns === "function" &&
                            renderHeaderBtns()}
                    </div>
                    <div>
                        <img src={crossIcon} onClick={onClosed} />
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
