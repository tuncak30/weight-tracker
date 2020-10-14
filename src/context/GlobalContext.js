import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from './AppReducer';

let initialState = JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA')) === null ? {
    loggedIn: false,
    user: {
        name : '',
        age: '',
        gender: '',
        height: '',
        currentWeight: '',
        targetWeight: ''
    },
    theme: 'LIGHT_THEME',
    kgs: [],
    exercises: [],
    meals: []
} : JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA'));

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(() => {
        localStorage.setItem('WEIGHT_TRACKER_DATA', JSON.stringify(state));
        initialState = JSON.parse(localStorage.getItem('WEIGHT_TRACKER_DATA'));
    }, [state])

    function login(login){
        dispatch({
            type: 'LOGIN',
            payload: login
        })
    }

    function addName(name){
        dispatch({
            type: 'ADD_NAME',
            payload: name
        })
    }

    function addAge(age){
        dispatch({
            type: 'ADD_AGE',
            payload: age
        })
    }


    function addGender(gender){
        dispatch({
            type: 'ADD_GENDER',
            payload: gender
        })
    }

    function addHeight(height){
        dispatch({
            type: 'ADD_HEIGHT',
            payload: height
        })
    }

    function addCurrentWeight(current_weight){
        dispatch({
            type: 'ADD_CURRENT_WEIGHT',
            payload: current_weight
        })
    }

    function addTargetWeight(target_weight){
        dispatch({
            type: 'ADD_TARGET_WEIGHT',
            payload: target_weight
        })
    }

    function changeTheme(theme){
        dispatch({
            type: 'CHANGE_THEME',
            payload: theme
        })
    }

    function addTodaysWeight(todays_weight){
        dispatch({
            type: 'ADD_TODAYS_WEIGHT',
            payload: {
                title: todays_weight + " kg",
                start: new Date().getTime(),
                end: new Date().getTime()
            }
        })
    }

    function addMeal(meal){
        dispatch({
            type: 'ADD_MEAL',
            payload: {
                meal: meal,
                consumed: new Date().getTime()
            }
        })
    }

    function addExercise(exercise){
        dispatch({
            type: 'ADD_EXERCISE',
            payload: {
                exercise: exercise,
                timestamp: new Date().getTime()
            }
        })
    }

    return(
        <GlobalContext.Provider value={{
            initialState: initialState,
            state: state,
            login,
            addName,
            addAge,
            addGender,
            addHeight,
            addCurrentWeight,
            addTargetWeight,
            changeTheme,
            addTodaysWeight,
            addMeal,
            addExercise
        }}>
                { children }
        </GlobalContext.Provider>
    )
}