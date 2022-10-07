import { Api } from "../axios-config";

export interface ILancamentoVO {
    Id: number;
    IdUsuario: number;
    IdDespesa: number;
    IdReceita: number;
    Valor: number;
    Data: string;
    Descricao: string;
    Categoria: string;
} 

const getByMesAnoByIdUsuario = async (mesano: string, idUsuario:number): Promise<any> => {
    try {
        const  data = await Api.get('/lancamento/' + mesano + '/' + idUsuario);
        if (data) {
            return data;
        }

        return Error('Erro ao pesquisar lançãmentos por ano mes.');
    } catch (error) {
         console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar lançamentos por ano mes.');
    }
};

const getSaldoByIdUsuario = async (idUsuario: number): Promise<any | ILancamentoVO[] |  Error> => {
    try {
        const { data } = await Api.get('/lancamento/saldo/$(idUsuario)');
        if (data) {
            return data;
        }

        return Error('Erro ao pesquisar lançamentos por usuário.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar lançamentos por usuário.');
    }
};

export const LancamentosService = {
    getByMesAnoByIdUsuario,
    getSaldoByIdUsuario,
};