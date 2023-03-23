import { Router } from "express";
import { getAll, getById, postHero, putById, deleteById} from "./controller";

export const heroeRoute = Router();

heroeRoute.get('/', getAll);

heroeRoute.get('/:id', getById);

heroeRoute.post('/', postHero);

heroeRoute.put('/:id', putById);

heroeRoute.delete('/:id', deleteById);







