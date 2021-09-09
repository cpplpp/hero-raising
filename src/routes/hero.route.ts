import express from 'express';
import { HeroService } from "../services/hero.service";

// export const heroRouter = express.Router();

export const getHeroRoutes = () => {
    const router = express.Router();
    const heroService = new HeroService();
    router.get('/:name/getHeroStats', getStats);
    router.get('/:name/getHeroImage', getImage);
    router.post('/:name/setHeroStats', setStats);
    router.post('/:name/uploadHeroImage', setImage)
    return router
}

/**
 * Get stats of selected hero
 */
const getStats = (req, res) => {
    res.send(req.params);
}

/**
 * Get image of selected hero
 */
const getImage = (req, res) => {
}

/**
 * Set stats for selected hero
 */
const setStats = (req, res) => {
}

/**
 * Set image for selected hero
 */
const setImage = (req, res) => {
}

