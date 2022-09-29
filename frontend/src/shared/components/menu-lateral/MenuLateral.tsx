import React from 'react';
import { Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { Label } from '@mui/icons-material';

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: String;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false })

    /* Atenção verificar se existe a necessidade do uso de useCallBack */
    const handleClick = () => {
        navigate(to);
        onClick?.();
        /*/onClick && onClick(); ou if(onClick) onClick()*/
    };

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <Icon >{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export const MenuLateral: React.FC<React.PropsWithChildren> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions  } = useDrawerContext()

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            alt="Alex Ribeiro"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="/static/images/avatar/1.jpg" />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav" >
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon  >home</HomeIcon>
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <ListItemLink
                                icon='home'
                                to='pagina-inicial'
                                label='Home'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            {drawerOptions.map(drawerOptions => (
                                <ListItemLink
                                    to={drawerOptions.path}                                    
                                    icon={drawerOptions.icon}
                                    label={drawerOptions.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                    key={drawerOptions.path}
                                />
                            ))}

                            <Divider />
                            <ListItemLink
                                icon='star'
                                to='configuracoes'
                                label='Configurações'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            <ListItemLink
                                icon='star'
                                to='sair'
                                label='Sair'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};