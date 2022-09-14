import React from 'react'
// @mui/material components
import { 
    Divider, Grid, Button, Typography, FilledInput, FormControl, FormHelperText, Box,
    FormLabel,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { EditData } from 'redux/actions/CatalogsActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "500px",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: "10px !important",
        [theme.breakpoints.down("sm")]: {
            width: "80vw"
        },
    },
    center: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    inputs: {
        width: '100%',
    },
    errorsView:{
        color: '#bf1650',
        '&::before': {
            display: 'inline',
            content: '"⚠ "',
        },
    },
    buttonSave: {
        color: 'white',
        margin: theme.spacing(3)
    },
}));

const DrawerAccountEdit = ({ handleDrawerClose }) => {
    const classes = useStyles();
    const account = useSelector(state => state.catalog.data)
    const dispatch = useDispatch()

    console.log(account)
    const defaultValues = {
        Account: account.Account,
        AcctType: account.AcctType,
        Description: account.Description,
        Department: account.Department,
        TypicalBal: account.TypicalBal,
    };
    
    const schema = yup.object().shape({
        AcctType: yup.string().required('Account type is required').trim(),
        Description: yup.string().required('Description is required').trim(),
        Department:  yup.string().required('Department is required').trim(),
        TypicalBal: yup.string().required('Typical bal required').trim(),
    });

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = data => { 

        dispatch(EditData(data, `account/update/${data.Account}`))
        reset(defaultValues);
        handleDrawerClose();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom className={classes.center}>
                            Update Account #{account.Account}
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled" component={Box} width="100%" marginBottom="1rem!important" >
                            <FormLabel>Type Account</FormLabel>
                            <Controller
                                name="AcctType"
                                control={control}
                                render={({ field }) =>
                                    <FilledInput
                                        {...field}
                                        size="small"
                                        className={classes.inputs}
                                        variant="outlined"
                                        label="note"
                                    />
                                } />
                            <FormHelperText>
                                <ErrorMessage errors={errors} name="AcctType" as="span" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled" component={Box} width="100%" marginBottom="1rem!important" >
                            <FormLabel>Description</FormLabel>
                            <Controller
                                name="Description"
                                control={control}
                                render={({ field }) =>
                                    <FilledInput
                                        {...field}
                                        size="small"
                                        className={classes.inputs}
                                        variant="outlined"
                                        label="note"
                                    />
                                } />
                            <FormHelperText>
                                <ErrorMessage errors={errors} name="Description" as="span" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled" component={Box} width="100%" marginBottom="1rem!important" >
                            <FormLabel>Department</FormLabel>
                            <Controller
                                name="Department"
                                control={control}
                                render={({ field }) =>
                                    <FilledInput
                                        {...field}
                                        size="small"
                                        className={classes.inputs}
                                        variant="outlined"
                                        label="note"
                                    />
                                } />
                            <FormHelperText>
                                <ErrorMessage errors={errors} name="Department" as="span" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="filled" component={Box} width="100%" marginBottom="1rem!important" >
                            <FormLabel>TypicalBal</FormLabel>
                            <Controller
                                name="TypicalBal"
                                control={control}
                                render={({ field }) =>
                                    <FilledInput
                                        {...field}
                                        size="small"
                                        className={classes.inputs}
                                        variant="outlined"
                                        label="note"
                                    />
                                } />
                            <FormHelperText>
                                <ErrorMessage errors={errors} name="TypicalBal" as="span" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Button className={classes.buttonSave} variant="contained" color="primary" type="submit" >
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default DrawerAccountEdit;