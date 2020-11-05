const express = require('express')
const router = express.Router()
const packageService = require('../services/package-stats')

/**
 * Route that return sizes information about a specific package
 */
router.get('/search', async (req, res) => {
    try {
        const packageStats = await packageService.getStats(req.query.package)
        res.json(packageStats)
    } catch (e) {
        console.log(e)
        res.status(400)
        res.json({ errorMessage: 'The information for this package could not be retrieved' })
    }
});

module.exports = router