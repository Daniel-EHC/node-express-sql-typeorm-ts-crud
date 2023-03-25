import { Router } from "express";
import { getAll, createId, removeId, updateId, getById,
         getByAlte, createAlte, removeAlte, updateAlte} from "./controller";


export const heroeRoute = Router();

heroeRoute.get('/', getAll);

//By ID//
heroeRoute.post('/', createId);
heroeRoute.get('/:id', getById);
heroeRoute.delete('/:id', removeId);
heroeRoute.put('/:id', updateId);

// By Alte//

heroeRoute.get('/alte/:alte', getByAlte);
heroeRoute.post('/alte/:alte', createAlte);
heroeRoute.delete('/alte/:alte', removeAlte);
heroeRoute.put('/alte/:alte', updateAlte);




