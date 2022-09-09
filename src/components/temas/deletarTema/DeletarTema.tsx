import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';

import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer'

function DeletarTema() {
  let history = useNavigate();
  const { id } = useParams<{ id: string }>();


  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      history("/login")

    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    buscaId(`/tema/${id}`, setTema, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim() {
    history('/temas')
    deleteId(`/tema/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Tema deletado com sucesso');
  }

  function nao() {
    history('/temas')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography  className='text-del' color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography  className='text-del' color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim}  variant="contained" className="marginLeft btn-cadastro-tema" size='large'  >
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' className='btn-cadastro-post-del'>
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;