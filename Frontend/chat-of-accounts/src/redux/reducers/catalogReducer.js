
import { types } from "../types"

const initialState = {
    datas: [],
    data: {}
}

export const catalogReducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case types.addData:
            return {
                ...state,
                datas: [...state.datas, action.payload]
            }

        case types.clearData:
            return initialState;
            
        case types.setDatasImport:
            return {
                ...state,
                datas: [ ...state.datas, ...action.payload ]
            }
        case types.setDatas:
            return {
                ...state,
                datas: [ ...action.payload ]
            }

        case types.setData:
            return {
                ...state,
                data: action.payload
            }

        case types.editData:
            return {
                ...state,
                datas: state.datas.map( data => data.Account === action.payload.Account 
                    ?  action.payload
                    :  data
                )
            }

        case types.deleteData:
            return {
                ...state,
                datas: state.datas.filter( data => data.Account !== action.payload )
            }
        default:
            return state;
    }
}