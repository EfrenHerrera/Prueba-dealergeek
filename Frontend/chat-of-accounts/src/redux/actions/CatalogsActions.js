import Axios from "axios";
import Swal from "sweetalert2";

import { BaseUrlLocal, types } from '../types';


export const getDatas = (url) => {
    return async (dispatch) => {
        await Axios.get(BaseUrlLocal + url).then(resp => {
            dispatch(setDataList(resp.data))
        }).catch(e => {
        });
    }
}
export const importData = (data, url) => {
    return async (dispatch) => {
        await Axios.post(BaseUrlLocal + url, data.filter(e => e.AcctType !== '\f')).then(resp => { 
            dispatch(setDataListImport(resp.data))
        }).catch( error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            });
        })
    };
}

export const addData = (data, url ) => {
    return async (dispatch) => {
        await Axios.post(BaseUrlLocal + url, data).then(resp => {
            if(resp.status === 200){
                dispatch(setDataToList(resp.data[0] ))
                
                setTimeout(() =>  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se agrego una nueva fila',
                    showConfirmButton: false,
                    timer: 1500
                }), 500);
            }
        }).catch(e => {
            setTimeout(() =>   Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            }), 500);
        });
    }
}

export const EditData = (data, url, stateDefault = true) => {
    return async (dispatch) => {
        await Axios.put(BaseUrlLocal + url, data).then(resp => {
            if(resp.status === 200){
                console.log(resp.data)
                dispatch(setEditData( stateDefault ? data : resp.data[0] ))
                setTimeout(() =>  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se actualizo correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }), 500);
            }
        }).catch(e => {
            setTimeout(() =>   Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            }), 500);
        });
    }
}

export const DeleteData = (id, url) => {
    return async (dispatch) => {
        await Axios.delete(BaseUrlLocal + url).then(resp => {
            if(resp.status === 200){
                dispatch(setDeleteData(id));
                setTimeout(() =>  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se elimino una fila',
                    showConfirmButton: false,
                    timer: 1500
                }), 500);
            }
        }).catch(e => {
            setTimeout(() =>   Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
            }), 500);
        });
    }
}

export const clearData = () => ({
    type: types.clearData,
})

export const setDataToList = (data) => ({
    type: types.addData,
    payload: data
});
export const setDataListImport = (data) => ({
    type: types.setDatasImport,
    payload: data
});
export const setDataList = (data) => ({
    type: types.setDatas,
    payload: data
});

export const setData = (data) => ({
    type: types.setData,
    payload: data
});

export const setEditData = (data) => ({
    type: types.editData,
    payload: data
});

export const setDeleteData = (id) => ({
    type: types.deleteData,
    payload: id
});


