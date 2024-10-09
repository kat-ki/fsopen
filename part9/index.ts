import express from 'express';
import {calculateBmi} from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!')
})

app.get('/bmi', (req: any, res: any) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const bmi = calculateBmi(height, weight);
    res.json({weight, height, bmi});
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})