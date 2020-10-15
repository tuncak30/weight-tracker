export default (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                loggedIn: !state.loggedIn
            }
        case 'ADD_NAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload
                }
            }
        case 'ADD_AGE':
            return {
                ...state,
                user: {
                    ...state.user,
                    age: action.payload
                }
            }
        case 'ADD_GENDER':
            return {
                ...state,
                user: {
                    ...state.user,
                    gender: action.payload
                }
            }
        case 'ADD_HEIGHT':
            return {
                ...state,
                user: {
                    ...state.user,
                    height: action.payload
                }
            }
        case 'ADD_CURRENT_WEIGHT':
            return {
                ...state,
                user: {
                    ...state.user,
                    currentWeight: action.payload
                }
            }
        case 'ADD_TARGET_WEIGHT':
            return {
                ...state,
                user: {
                    ...state.user,
                    targetWeight: action.payload
                }
            }
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'ADD_TODAYS_WEIGHT':
            return {
                ...state,
                kgs: [...state.kgs, action.payload]
            }
        case 'ADD_MEAL':
            return {
                ...state,
                meals: [...state.meals, action.payload]
            }
        case 'ADD_EXERCISE':
            return {
                ...state,
                exercises: [...state.exercises, action.payload]
            }

        case 'ADD_SIGNED_UP_USER':
            return {
                ...state,
                signedupuser: action.payload
            }
        default:
            return state
    }

}