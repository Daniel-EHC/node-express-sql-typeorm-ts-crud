import { Router } from "express";
import { getAll, createId, removeId, getById, updateId,
    getByAlte, createAlte, removeAlte, updateAlte } from "../villan/controller";


export const villanRoute = Router();

villanRoute.get('/', getAll);

//By ID//
villanRoute.post('/', createId);
villanRoute.get('/:id', getById);
villanRoute.delete('/:id', removeId);
villanRoute.put('/:id', updateId);

// By Alte//

villanRoute.get('/alte/:alte', getByAlte);
villanRoute.post('/alte/:alte', createAlte);
villanRoute.delete('/alte/:alte', removeAlte);
villanRoute.put('/alte/:alte', updateAlte);