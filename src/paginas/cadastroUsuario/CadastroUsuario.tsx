import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service'
import { toast } from 'react-toastify';

import './CadastroUsuario.css';

function CadastroUsuario() {

    let history = useNavigate()

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            history('/login')
        }
    }, [userResult])


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
        if (confirmarSenha === user.senha && user.senha.length >= 8) {

            //Tenta executar o cadastro
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                toast.success('Usuário cadastrado com sucesso', {position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, theme: "colored", progress: undefined, });

            //Se houver erro, pegue o Erro e retorna uma msg
            } catch (error) {
                console.log(`Error: ${error}`)
                
                //Pode modificar a msg de acordo com o erro 
                toast.error('Dados inconsistentes. Favor verificar as informações de cadastro', {position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, theme: "colored", progress: undefined, });
            }

        } else {
            toast.error('Insira no minimo 8 caracteres', {position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, theme: "colored", progress: undefined, });    // Mensagem que indica a quantidade minima de caracteres

            setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
            setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
        }
    }
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className='cadastro'>
        <Grid item xs={6} className='imagem2'></Grid>
        <Grid item xs={6} alignItems='center' className='cadastro'>
            <Box paddingX={10} className='boxCadastro'>

                <form onSubmit={cadastrar}>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='text-login'>Cadastrar</Typography>

                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        value={user.nome}
                        id='nome'
                        label='nome'
                        variant='outlined'
                        name='nome'
                        margin='normal'
                        fullWidth 
                        required 
                        className='textfield-login'/> {/* Required: indica que o campo deve ser preenchido */}

                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        value={user.usuario}
                        type="email"
                        id='usuario'
                        label='usuario'
                        variant='outlined'
                        name='usuario'
                        margin='normal'
                        fullWidth required 
                        className='textfield-login'/>

                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        value={user.foto}
                        id='foto'
                        label='foto'
                        variant='outlined'
                        name='foto'
                        margin='normal'
                        fullWidth 
                        className='textfield-login'/>

                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        value={user.senha}
                        id='senha'
                        label='senha'
                        variant='outlined'
                        name='senha'
                        margin='normal' type='password'
                        fullWidth required 
                        className='textfield-login'/>

                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                        value={confirmarSenha}
                        id='confirmarSenha'
                        label='confirmarSenha'
                        variant='outlined'
                        name='confirmarSenha'
                        margin='normal' type='password'
                        fullWidth required 
                        className='textfield-login'/>


                    <Box marginTop={2} textAlign='center'>
                        <Button type='submit' variant='contained' color='primary' className='btn-login'>
                            Cadastrar
                        </Button>
                        <Link to='/login' className='text-decorator-none'>
                            <Button variant='contained' color='secondary' className='btn-cancelar'>
                                Cancelar
                            </Button>
                        </Link>
                    </Box>
                </form>

            </Box>
        </Grid>
    </Grid>
)
}

export default CadastroUsuario;