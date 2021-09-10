import express from 'express';
import sqlite3 from 'sqlite3';



class HeroMiddleware {
    async validateHeroFieldsForCreation(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.name && req.body.strength && req.body.dexterity && req.body.intelligence && typeof req.body.isInvincible !== 'undefined') {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields for Hero creating`,
                hint: `required fields: name, strength, dexterity, intelligence, isInvincible`
            })
        }
    }

    async validateHeroFieldsTypes(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if ((typeof req.body.name === 'string' || typeof req.body.name === 'undefined') && typeof req.body.strength === 'number' && typeof req.body.dexterity === 'number' && typeof req.body.intelligence === 'number' && typeof req.body.isInvincible === 'boolean') {
            next();
        } else {
            res.status(400).send({
                error: `Wrong data types for Hero fields`,
                hint: `field types: name: string, strength: number, dexterity: number, intelligence: number, isInvincible: boolean`
            })
        }
    }

    async validateHeroFieldsForUpdating(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.strength && req.body.dexterity && req.body.intelligence && typeof req.body.isInvincible !== 'undefined') {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields for setting Hero stats`,
                hint: `required fields: strength, dexterity, intelligence, isInvincible`
            })
        }
    }

    validateHeroImage(db) {
        return async function (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            db.get(
                `select * from hero where name = '${req.params.name}'`, (error, row) => {
                    if (error) {
                        res.status(400).send({
                            error: `Something went wrong! ${error}`
                        });
                        return console.error(error);
                    }
                    if (row) {
                        next()
                    } else {
                        res.status(400).send({
                            error: `No Hero with name ${req.params.name}`
                        });
                    }
                });
        }
    }
}

export default new HeroMiddleware();