import { useEffect } from 'react'
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'pagina-inicial'
            },
            {
                icon: 'star',
                path: '/despesas',
                label: 'Despesas'
            },
            {
                icon: 'star',
                path: '/receitas',
                label: 'Receitas'
            },
            {
                icon: 'star',
                path: '/lancamentos',
                label: 'Lançamentos'
            }



        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Home</Button>} />
            <Route path='/despesas' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Despesas</Button>} />
            <Route path='/receitas' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Receitas</Button>} />
            <Route path='/lancamentos' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Lançamentos</Button>} />
            <Route path='/configuracoes' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Configurações</Button>} />
            <Route path='/sair' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Sair</Button>} />

            {<Route path='*' element={<Navigate to='pagina-inicial' />} />}
        </Routes>

    )
}