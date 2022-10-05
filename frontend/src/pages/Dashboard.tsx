import { Box, Paper } from '@mui/material';
import { BarCharts, BarChartInLine, PieChartT } from '../shared/components';
import { LayoutMasterPage } from '../shared/layouts';


export const Dashboard = () => {

    return (
        <LayoutMasterPage titulo='Meu Dashboard' >
            <Box gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper}>
                    <BarCharts />
            </Box>
        </LayoutMasterPage>
    );
}
