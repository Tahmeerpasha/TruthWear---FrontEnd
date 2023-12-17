const initialState = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    saveInfo: false,
};

const cardSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_CARD_NUMBER':
            return { ...state, cardNumber: action.payload };
        case 'TOGGLE_SAVE_INFO':
            return { ...state, saveInfo: !state.saveInfo };
        // Other cases for expiry, cvv, etc. as needed
        default:
            return state;
    }
};

export default cardSlice;
