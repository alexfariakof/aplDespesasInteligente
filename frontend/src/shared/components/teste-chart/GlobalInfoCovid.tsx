import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react'
import { responseData } from '../../../types';
import CountryList from './CountryList';
import GlobalInfo from './GlobalInfo';



export const GlobalInfoCovid = () => {
    const [responseData, setresponseData] = useState<responseData | undefined>(undefined);

    const fetchData = async () => {
        const result = await fetch('https://api.covid19api.com/summary');
        const responseData: responseData = await result.json();

        setresponseData(responseData);
        console.log(responseData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box gap={1}
            margin={2}
            padding={1}
            paddingX={2}
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="start"
            component={Paper}>
            {
                responseData ?
                    <>
                        <GlobalInfo
                            newConfirmed={responseData?.Global.NewConfirmed}
                            newDeaths={responseData?.Global.NewDeaths}
                            newRecovered={responseData?.Global.NewRecovered} />



                        <CountryList countries={responseData.Countries} />
                    </>
                    : "Loadding....."

            }
        </Box>
    );
}
