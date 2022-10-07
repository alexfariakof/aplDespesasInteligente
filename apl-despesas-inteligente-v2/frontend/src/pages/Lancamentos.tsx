import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { LayoutMasterPage } from '../shared/layouts';
import { BarraFerramentas } from '../shared/components';
import { useEffect, useState } from 'react';
import { LancamentosService, ILancamentoVO } from '../shared/services/api';
import { useDebounce } from '../shared/hooks';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'


export const Lancamentos = () => {
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<ILancamentoVO[]>([]);

    useEffect(() => {
        debounce(() => {
            LancamentosService.getByMesAnoByIdUsuario('2014-08-18T21:11:54', 1)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    else {
                       setRows(result);
                    }
                    console.log(result);
                });
        });
    }, []);

    const handleDelete = (id: number) => {
            alert('handle Botão Delete funcionando')   ;       

    };

    const handleEdit = (id: number) => {
        alert('handle Botão Edit funcionando')   ;       

};

    return (
        <LayoutMasterPage titulo='Lançamentos'
            barraDeFerramentas={(
                <BarraFerramentas btnNovo={false} />
            )}
        >

            <Box
                gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="row"
                alignItems="start"
                component={Paper} >
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ações</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Usuário</TableCell>
                                <TableCell>Tipo de Lançamento</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete(1)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit(1)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>Alex</TableCell>
                                <TableCell>Receitas</TableCell>
                                <TableCell>R$ 12.250,00</TableCell>
                                <TableCell>Teste de grid  dinamica </TableCell>
                                <TableCell>Alimentação</TableCell>
                            </TableRow>

                            {
                                rows.map(row => (
                                    <TableRow key={row.Id}>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(row.Id) }>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(row.Id)  }>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.Id}</TableCell>
                                        <TableCell>{row.IdUsuario}</TableCell>
                                        <TableCell>{row.IdDespesa}</TableCell>
                                        <TableCell>{row.Valor}</TableCell>
                                        <TableCell>{row.Descricao}</TableCell>
                                        <TableCell>{row.Categoria}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>

            </Box>


        </LayoutMasterPage>
    );
}
