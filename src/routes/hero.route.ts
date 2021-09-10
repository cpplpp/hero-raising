import path from 'path';
import express from 'express';
import sqlite3 from 'sqlite3';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import HeroMiddleware from "../middlewares/hero.middleware";

const imageDir = path.join(__dirname, '../../hero-images');

const db = new sqlite3.Database('./src/domain/sqlite.db', (error) => {
    if (error)
        console.error(error.message)
    console.log('Connected to sqlite database')
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './hero-images/')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.name)
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }
});
const router = express.Router();

export const getHeroRoutes = () => {
    router.use(express.json());
    router.use(upload.single('heroImage'));
    router.route('/:name/getHeroStats').get(getStats);
    router.route('/getAllHeroes').get(getAll);
    router.route('/:name/getHeroImage').get(getImage);
    router.route('/createHero').all(HeroMiddleware.validateHeroFieldsForCreation, HeroMiddleware.validateHeroFieldsTypes).post(createHero);
    router.route('/:name/setHeroStats').all(HeroMiddleware.validateHeroFieldsForUpdating, HeroMiddleware.validateHeroFieldsTypes).put(setStats);
    // router.route('/:name/uploadHeroImage').all(HeroMiddleware.validateHeroImage).post(upload.single('heroImage'), setImage);
    return router;
}

/**
 * Get stats of selected hero
 */
const getStats = (req: express.Request, res: express.Response) => {
    db.get(
        `select * from hero where name = '${req.params.name}'`, (error, row) => {
            if (error) {
                res.status(400).send({
                    error: `Something went wrong! ${error}`
                });
                return console.error(error);
            }
            row.isInvincible = Boolean(row.isInvincible);
            res.status(200).send(row);
        });
}

const getAll = (req: express.Request, res: express.Response) => {
    db.all(`select * from hero`, (error, rows) => {
        if (error) {
            res.status(400).send({
                error: `Something went wrong! ${error}`
            });
            return console.error(error);
        }
        for (const row of rows) {
            row.isInvincible = Boolean(row.isInvincible);
        }
        res.status(200).send(rows);
    })
}

/**
 * Get image of selected hero
 */
const getImage = (req: express.Request, res: express.Response) => {
    res
        .set('Content-Type', 'image/png')
        .sendFile(`${imageDir}/${req.params.name}`);
}

/**
 * Creates a new Hero
 */
const createHero = (req: express.Request, res: express.Response) => {
    const id = uuid();
    db.run(`
        insert into hero(id, name, strength, dexterity, intelligence, isInvincible) 
        values('${id}', '${req.body.name}', ${req.body.strength}, ${req.body.dexterity}, ${req.body.intelligence}, ${Number(req.body.isInvincible)})
        `, error => {
            if (error) {
                res.status(400).send({
                    error: `Something went wrong! ${error}`
                });
                return console.error(error);
            }
            res.status(200).send({
                success: `Hero ${req.body.name} with id ${id} successfully created!`
            });
    });
}

/**
 * Set stats for selected hero
 */
const setStats = (req: express.Request, res: express.Response) => {
    db.run(`
        update hero
        set strength = ${req.body.strength},
            dexterity = ${req.body.dexterity},
            intelligence = ${req.body.intelligence},
            isInvincible = ${Number(req.body.isInvincible)}
        where name = '${req.params.name}'
    `, error => {
        if (error) {
            res.status(400).send({
                error: `Something went wrong! ${error}`
            });
            return console.error(error);
        }
        res.status(200).send({
            success: `Hero ${req.params.name} has been updated!`,
            stats: {
                strength: req.body.strength,
                dexterity: req.body.dexterity,
                intelligence: req.body.intelligence,
                isInvincible: Number(req.body.isInvincible)
            }
        });
    })
}

/**
 * Set image for selected hero
 */
router.post('/:name/uploadHeroImage', HeroMiddleware.validateHeroImage(db), upload.single('heroImage'), (req, res) => {
    res.status(200).send({
        success: `Image for Hero ${req.params.name} has been added`
    })
})
