import React, { useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { calcRem } from "../../../../helpers";
import { CustomModal } from "../../custom-modal/custom-modal";
import { otherUserProfileModalActions } from "../../../../store/actions";
import { otherUserProfileModalTabs } from "../../../../constants";
import { UserProfileInfo } from "./user-profile-info";
import { UserProfilePhotos } from "./user-profile-photos";
import { UserProfileHobbies } from "./user-profile-hobbies";

import CrossIMG from "images/cross.svg";

import "./user-profile.scss";
import { Button } from "reactstrap";

const mapStateToProps = ({ otherUserProfileModal: { show } }) => ({
    show,
});

const mapDispatchToProps = (dispatch) => ({
    otherUserProfileModalActions: bindActionCreators(
        otherUserProfileModalActions,
        dispatch
    ),
});

export const UserProfileModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ show, otherUserProfileModalActions }) => {
    const [activeTab, setActiveTab] = useState(
        otherUserProfileModalTabs.PROFILE
    );

    const tabsArray = useMemo(() => {
        const result = [];

        for (const [key, value] of Object.entries(otherUserProfileModalTabs)) {
            result.push({ key, ...value });
        }
        return result;
    }, []);

    const renderTab = () => {
        switch (activeTab) {
            case otherUserProfileModalTabs.PROFILE:
                return <UserProfileInfo />;
            case otherUserProfileModalTabs.PHOTOS:
                return <UserProfilePhotos />;
            case otherUserProfileModalTabs.HOBBIES:
                return <UserProfileHobbies />;
        }
    };

    const renderNavs = () => {
        return tabsArray.map(({ key, name, icon, iconActive }) => (
            <div key={key}>
                <img
                    src={name === activeTab.name ? iconActive : icon}
                    title={name}
                    onClick={() => setActiveTab(otherUserProfileModalTabs[key])}
                />
            </div>
        ));
    };

    return (
        <CustomModal
            isOpen={show}
            height={calcRem(400)}
            width={calcRem(685)}
            className="user-profile-modal"
            crossIcon={CrossIMG}
            onClosed={otherUserProfileModalActions.close}
            hasFooter={true}
            renderFooterBtns={() => (
                <Button
                    className="light"
                    onClick={otherUserProfileModalActions.close}
                >
                    Закрыть
                </Button>
            )}
        >
            <div className="user-profile-modal__content">
                <div className="user-profile-modal__content__tab">
                    {renderTab()}
                </div>
                <div className="user-profile-modal__content__navs">
                    {renderNavs()}
                </div>
            </div>
        </CustomModal>
    );
});
