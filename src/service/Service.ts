import { SettingsSystemDaydreamOutlined } from "@material-ui/icons";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://bpluiza.herokuapp.com'
})

export const cadastroUsuario = async(url:any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async(url:any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data.token)
}
