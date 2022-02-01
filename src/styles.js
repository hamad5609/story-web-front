import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    loader: {
        display: 'flex',
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: '1200',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000000a6',
    },
    spinner: {
        color: 'white',
        width: '55px !important',
        height: '55px !important',
    }

}));