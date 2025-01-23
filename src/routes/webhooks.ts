import express from 'express';

const router = express.Router();

router.post('/:user_id', async (req, res) => {
    const body = req.body;

    console.log(body);
    console.log(req.params.user_id)

    res.status(200).json({ message: 'hello from express' });
});

export default router;
