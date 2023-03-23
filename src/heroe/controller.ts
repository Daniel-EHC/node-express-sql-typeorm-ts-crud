import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Heroe } from "../models/heroe.entity";



export const getAll = async (req: Request, res: Response) => {

    const heroRepository = AppDataSource.getRepository(Heroe);
    const alHeroes = await heroRepository.find();
    return res.json(alHeroes);
}

export const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const heroRepository = AppDataSource.getRepository(Heroe);
    const idHeroe = await heroRepository.findOneBy({ id: parseInt(id) })

    if (idHeroe) {
        
        return res.json(idHeroe);
    }
    return res.status(400).json(
        {
            message: `Heros ${id} not found`
        }
    );

    
}

export const postHero = async (req: Request, res: Response) => {

    const { alte, nombre } = req.body;

    const values = (
        {
            nombre: nombre,
            alte: alte
        })
    const heroRepository = AppDataSource.getRepository(Heroe);
    const copyHeroe = await heroRepository.findOneBy(values);

    if (copyHeroe) {
        return res.status(400).json(
            {
                message: `The hero ${alte} already exist`
            }
        )
    }
    await heroRepository.insert(values);
    return res.json(values);
}


export const putById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { alte, nombre } = req.body;


    const heroRepository = AppDataSource.getRepository(Heroe);
    const findHeroe = await heroRepository.findOneBy({ id: parseInt(id) });

    if (findHeroe) {
        findHeroe.nombre = nombre
        findHeroe.alte = alte
        await heroRepository.save(findHeroe);
        return res.json(findHeroe);
    }
    return res.status(404).json(
        {
            message: `The hero ${alte} not exist`
        }
    );

}

export const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const heroRepository = AppDataSource.getRepository(Heroe);
    const findHeroe = await heroRepository.findOneBy({ id: parseInt(id) });

    if (findHeroe) {
        
        await heroRepository.remove(findHeroe);
        return res.json("Hero deleted");
    }
    return res.status(404).json(
        {
            message: `The hero ${id} not exist`
        }
    );

}

