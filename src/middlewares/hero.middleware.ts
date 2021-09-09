import express from 'express';

class HeroMiddleware {
    async validateHeroFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.name && req.body.strength && req.body.dexterity && req.body.intelligence && req.body.req.isInvincible) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields for Hero`,
                hint: `required fields: name, strength, dexterity, intelligence, isInvincible`
            })
        }
    }

    async validateHeroFieldsTypes(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (typeof req.body.name === 'string' && typeof req.body.strength === 'number' && typeof req.body.dexterity === 'number' && typeof req.body.intelligence === 'number' && typeof req.body.req.isInvincible === 'boolean') {
            next();
        } else {
            res.status(400).send({
                error: `Wrong data types for Hero fields`
            })
        }
    }
}

export default new HeroMiddleware();