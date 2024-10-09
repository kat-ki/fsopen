import express, {Request, Response} from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from './exerciseCalculator'

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!')
});

app.get('/bmi', (req: any, res: any) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const bmi = calculateBmi(height, weight);
    res.json({weight, height, bmi});
});

interface ExerciseRequest {
    daily_exercises: number[],
    target: number
}
app.post('/exercises', (req: Request<{}, {}, ExerciseRequest>, res: Response) => {
    const target: number = Number(req.body.target);
    const daily_exercises: number[] = req.body.daily_exercises;

    if (!target || !daily_exercises) {
        res.status(400).json({error: 'parameters missing'});
    }
    if (!Array.isArray(daily_exercises) || daily_exercises.every(value => !isNaN(value)) || isNaN(target)) {
        res.status(400).json({error: 'malformatted parameters'});
    }
    const result = calculateExercises(target, daily_exercises);
    res.status(200).json(result);
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})