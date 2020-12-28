import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const CustomModal = ({
    content,
    headerText,
    color,
    isOpen,
    children,
    footerText,
}) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalBody>{children || content}</ModalBody>
            <ModalFooter>{footerText}</ModalFooter>
        </Modal>
    );
};
