import { useEffect } from 'react'
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';
import { Despesas } from '../pages/despesas/Despesas';
import { Lancamentos } from '../pages/lancamentos/Lancamentos';

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
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/despesas' element={<Despesas />} />
            <Route path='/receitas' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Receitas</Button>} />
            <Route path='/lancamentos' element={<Lancamentos />} />
            <Route path='/configuracoes' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Configurações</Button>} />
            <Route path='/sair' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Sair</Button>} />

            {<Route path='*' element={<Navigate to='pagina-inicial' />} />}
        </Routes>

    )
}