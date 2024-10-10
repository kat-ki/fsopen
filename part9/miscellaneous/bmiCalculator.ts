export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Very overweight'
    }
};

console.log(calculateBmi(180, 74));

interface BMIvalues {
    height: number
    weight: number
}

const parseArgs = (args: string[]): BMIvalues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers!');
    }
}

if (require.main === module) {
    try {
        const { height, weight } = parseArgs(process.argv);
        const result = calculateBmi(height, weight);
        console.log(result);
    } catch (error: unknown) {
        let errorMsg = 'Something went wrong';
        if (error instanceof Error) {
            errorMsg += ' Error: ' + error.message;
        }
        console.log(errorMsg);
    }
}