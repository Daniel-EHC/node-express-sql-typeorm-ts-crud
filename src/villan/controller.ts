import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Villan } from "../models/villan.entity";

const villanRepository = AppDataSource.getRepository(Villan);

//By ID//

export const getAll = async (req: Request, res: Response) => {

    const villans = await villanRepository.find();
    return res.json(villans);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const villan = await villanRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villan) {
        return res.status(404).json({
            message: `villan with id: ${id}, not found`
        })
    }

    res.json(villan);
}

export const createId = async (req: Request, res: Response) => {

    const { alte, nombre } = req.body;

    const oldvillan = await villanRepository.findOneBy({ alte });

    if (oldvillan) {
        return res
            .status(400)
            .json({
                message: `villan ${alte} already exists`
            })
    }

    const newvillan = villanRepository.create({ alte, nombre });
    await villanRepository.insert(newvillan);

    res.json(newvillan);
}

export const removeId = async (req: Request, res: Response) => {

    const { id } = req.params;

    const oldvillan = await villanRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldvillan) {
        return res
            .status(404)
            .json({
                message: `villan with id: ${id} not found`
            })
    }

    const deletedvillan = await villanRepository.delete({ id: Number.parseInt(id) });

    res.json({
        affectedRows: deletedvillan,
    });
}

export const updateId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre } = req.body;

    const villanById = await villanRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villanById) {
        return res
            .status(404)
            .json({
                message: `villan with id ${id} not found`
            })
    }

    if (alte) {
        const oldvillan = await villanRepository.findOneBy({ alte });

        if (oldvillan && oldvillan.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                    message: `villan ${alte} already exists`
                })
        }
    }

    const updatedvillan = villanRepository.create({
        id: villanById.id,
        alte: alte ? alte : villanById.alte,
        nombre: nombre ? nombre : villanById.nombre
    });

    await villanRepository.save(updatedvillan);

    res.json(updatedvillan);
}

// By Alte//

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const villan = await villanRepository.findOneBy({ alte });

    if (!villan) {
        return res.status(404).json({
            message: `villan with Alte: ${alte}, not found`
        })
    }

    res.json(villan);
}

export const createAlte = async (req: Request, res: Response) => {
    const alte = req.params.alte;
    const { nombre } = req.body;

    const oldvillan = await villanRepository.findOneBy({ alte });

    if (oldvillan) {
        return res
            .status(400)
            .json({
                message: `villan ${alte} already exists`
            })
    }

    const newvillan = villanRepository.create(
        { 
            nombre: nombre,
            alte: alte 
        });
    await villanRepository.insert(newvillan);

    res.json(newvillan);
}

export const removeAlte = async (req: Request, res: Response) => {

    const alte = req.params.alte;

    const oldvillan = await villanRepository.findOneBy({ alte});

    if (!oldvillan) {
        return res
            .status(404)
            .json({
                message: `villan with id: ${alte} not found`
            })
    }

    const deletedvillan = await villanRepository.delete({ alte: alte });

    res.json({
        affectedRows: deletedvillan,
    });
}

export const updateAlte = async (req: Request, res: Response) => {
    const alte = req.params.alte;
    const nombre = req.body.nombre;

    const villanByAlte = await villanRepository.findOneBy({ alte: alte });

    if (!villanByAlte) {
        return res
            .status(404)
            .json({
                message: `villan with id ${alte} not found`
            })
    }

    if (alte) {
        const oldvillan = await villanRepository.findOneBy({ alte });

        if (oldvillan && oldvillan.alte !== alte) {
            return res
                .status(400)
                .json({
                    message: `villan ${alte} already exists`
                })
        }
    }

    const updatedvillan = villanRepository.create({ 
        id: villanByAlte.id,
        nombre: nombre,
        alte: alte ? alte : villanByAlte.alte
    });

    await villanRepository.save(updatedvillan);

    res.json(updatedvillan);
}
