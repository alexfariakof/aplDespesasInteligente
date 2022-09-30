import { Box, Button, Paper, TextField } from '@mui/material';
import { LayoutMasterPage } from '../shared/layouts';
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const Lancamentos = () => {

    return (
        <LayoutMasterPage titulo='Lançamentos como Parametro' >
            Testando Lançamentos
            <Box
                gap={1}
                marginX={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} >

                <TextField size="small" placeholder='Digite um sobre nome' inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" placeholder='Digite um sobre sobre nome' inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" placeholder='Digite um telefone' inputProps={{ maxLength: 15, type:'tel' }} fullWidth />
                <TextField size="small" placeholder='Digite um email' inputProps={{ maxLength: 50, type:'email' }} fullWidth />
                <TextField size="small" placeholder='Senha' inputProps={{ maxLength: 50, type:'email' }} fullWidth />
                <TextField size="small" placeholder='Comfirme Senha' inputProps={{ maxLength: 50, type:'email' }} fullWidth />
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<AddCircleIcon />}
                >Salvar</Button>
                            </Box>


        </LayoutMasterPage>
    );
}
