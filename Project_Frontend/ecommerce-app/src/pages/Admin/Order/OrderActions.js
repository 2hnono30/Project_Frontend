import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress, Fab } from '@mui/material';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import AppContext from '../../../contexts/AppContext';
import { updateOrderStatus } from './OrderService';
import { toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';

const OrderActions = ({ params, rowId, setRowId }) => {

  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const { status, id } = params.row;
    const result = await updateOrderStatus(status, id);
    setTimeout(() => {
      if (result) {
        setSuccess(true);
        setRowId(id);
      }
      setLoading(false)
      setTimeout(() => {
        setSuccess(false);
        toast.success("status update successful");
      }, 2000)
    }, 2000)
  };

  // useEffect(() => {
  //   if (rowId === params.id && success) setSuccess(false);
  // }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <>
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              '&:hover': { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            // disabled={params.id !== rowId || loading}
            onClick={null}
          >
            <EditNoteIcon />
          </Fab>
        </>
      ) : (
        <>
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            // disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            // disabled={params.id !== rowId || loading}
            onClick={null}
          >
            <EditNoteIcon />
          </Fab>
        </>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export default OrderActions