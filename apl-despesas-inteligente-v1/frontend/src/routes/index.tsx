import { useEffect } from 'react'
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages/Dashboard';
import { Despesas } from '../pages/Despesas';
import { Lancamentos } from '../pages/Lancamentos';
import { Usuarios } from '../pages/usuarios';
import { Receitas } from '../pages/Receitas';

export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Home'
            },
            {
                icon: 'listalt',
                path: '/despesas',
                label: 'Despesas'
            },
            {
                icon: 'listalt',
                path: '/receitas',
                label: 'Receitas'
            },
            {
                icon: 'viewlist',
                path: '/lancamentos',
                label: 'Lançamentos'
            }
        ]);
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/despesas' element={<Despesas />} />
            <Route path='/receitas' element={<Receitas />} />
            <Route path='/categoria' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Categoria</Button>} />
            <Route path='/lancamentos' element={<Lancamentos />} />
            <Route path='/configuracoes' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Configurações</Button>} />
            <Route path='/sair' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Sair</Button>} />
            <Route path='/primeiro-acesso' element={<Usuarios />} />
            <Route path='/alterar-senha' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Aletar Senha</Button>} />
            <Route path='/esqueci-senha' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Esqueci minha senha</Button>} />           
            {<Route path='*' element={<Navigate to='pagina-inicial' />} />}
        </Routes>

    )
}