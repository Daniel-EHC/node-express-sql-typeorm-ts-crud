import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Heroe } from "../models/heroe.entity";

const heroRepository = AppDataSource.getRepository(Heroe);

//By ID//

export const getAll = async (req: Request, res: Response) => {

    const heroes = await heroRepository.find();
    return res.json(heroes);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const hero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        })
    }

    res.json(hero);
}

export const createId = async (req: Request, res: Response) => {

    const { alte, nombre } = req.body;

    const oldHero = await heroRepository.findOneBy({ alte });

    if (oldHero) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }

    const newHero = heroRepository.create({ alte, nombre });
    await heroRepository.insert(newHero);

    res.json(newHero);
}

export const removeId = async (req: Request, res: Response) => {

    const { id } = req.params;

    const oldHero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldHero) {
        return res
            .status(404)
            .json({
                message: `Hero with id: ${id} not found`
            })
    }

    const deletedHero = await heroRepository.delete({ id: Number.parseInt(id) });

    res.json({
        affectedRows: deletedHero,
    });
}

export const updateId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre } = req.body;

    const heroById = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!heroById) {
        return res
            .status(404)
            .json({
                message: `Hero with id ${id} not found`
            })
    }

    if (alte) {
        const oldHero = await heroRepository.findOneBy({ alte });

        if (oldHero && oldHero.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                    message: `Hero ${alte} already exists`
                })
        }
    }

    const updatedHero = heroRepository.create({
        id: heroById.id,
        alte: alte ? alte : heroById.alte,
        nombre: nombre ? nombre : heroById.nombre
    });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}

// By Alte//

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const hero = await heroRepository.findOneBy({ alte });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        })
    }

    res.json(hero);
}

export const createAlte = async (req: Request, res: Response) => {
    const alte = req.params.alte;
    const { nombre } = req.body;

    const oldHero = await heroRepository.findOneBy({ alte });

    if (oldHero) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }

    const newHero = heroRepository.create(
        { 
            nombre: nombre,
            alte: alte 
        });
    await heroRepository.insert(newHero);

    res.json(newHero);
}

export const removeAlte = async (req: Request, res: Response) => {

    const alte = req.params.alte;

    const oldHero = await heroRepository.findOneBy({ alte});

    if (!oldHero) {
        return res
            .status(404)
            .json({
                message: `Hero with id: ${alte} not found`
            })
    }

    const deletedHero = await heroRepository.delete({ alte: alte });

    res.json({
        affectedRows: deletedHero,
    });
}

export const updateAlte = async (req: Request, res: Response) => {
    const alte = req.params.alte;
    const nombre = req.body.nombre;

    const heroByAlte = await heroRepository.findOneBy({ alte: alte });

    if (!heroByAlte) {
        return res
            .status(404)
            .json({
                message: `Hero with id ${alte} not found`
            })
    }

    if (alte) {
        const oldHero = await heroRepository.findOneBy({ alte });

        if (oldHero && oldHero.alte !== alte) {
            return res
                .status(400)
                .json({
                    message: `Hero ${alte} already exists`
                })
        }
    }

    const updatedHero = heroRepository.create({ 
        id: heroByAlte.id,
        nombre: nombre,
        alte: alte ? alte : heroByAlte.alte
    });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}
