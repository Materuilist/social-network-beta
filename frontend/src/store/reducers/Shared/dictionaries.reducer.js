const initialState = {
    cities: [],
};

export const dictionariesReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case "SET_DICTIONARY": {
            return { ...state, [payload.dictionary]: payload.items };
        }
        default: {
            return state;
        }
    }
};
