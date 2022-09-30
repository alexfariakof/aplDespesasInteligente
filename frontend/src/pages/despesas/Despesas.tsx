import { useState } from 'react';
import { Box, Button, FormControl,  InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import { LayoutMasterPage } from "../../shared/layouts";
import { Save } from '@mui/icons-material';

interface State {
    amount: string;
}
export const Despesas = () => {

    const [values, setValues] = useState<State>({
        amount: '',
      });
    
      const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [prop]: event.target.value });
        };
    
    return (
        <LayoutMasterPage titulo='Despesas como Parametro' >
            <Box
                gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} >

                <TextField size="small" label="Nome" inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" label='Sobre nome' inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" label='Telefone' inputProps={{ maxLength: 15, type: 'tel' }} fullWidth />
                <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth />
                <FormControl size="small" fullWidth variant="outlined" >
                    <InputLabel htmlFor="txtValor">Valor</InputLabel>
                    <OutlinedInput
                        id="txtValor"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor"
                    />
                </FormControl>
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<Save />}
                >Salvar</Button>
            </Box>

        </LayoutMasterPage>
    );
}
