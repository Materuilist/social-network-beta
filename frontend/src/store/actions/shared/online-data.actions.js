import { onlineDataActionTypes } from "../../actionTypes";

const setOnlineStatuses = (statuses = []) => ({
    type: onlineDataActionTypes.SET_ONLINE_STATUSES,
    payload: statuses,
});

export const toggleUserOnlineStatus = (userId, isOnline) => (
    dispatch,
    getState
) => {
    if (!userId || isOnline == null) return;

    const {
        onlineData: { onlineStatuses },
    } = getState();

    const userItem = onlineStatuses.find((status) => status.userId === userId);
    dispatch(
        setOnlineStatuses(
            userItem
                ? onlineStatuses.map((status) =>
                      status.userId === userId ? { userId, isOnline } : status
                  )
                : [...onlineStatuses, { userId, isOnline }]
        )
    );
};
