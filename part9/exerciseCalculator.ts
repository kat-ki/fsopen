// 9.2: Exercise calculator
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hoursPerDay: number[], target: number): Result => {
    const periodLength = hoursPerDay.length;
    const trainingDays = hoursPerDay.filter(day => day > 0).length;
    const totalHours = hoursPerDay.reduce((acc, curr) => acc + curr, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Good job! You met your target.';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not bad, but you can do better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to put in more effort.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))


// 9.3 Command line Exercise Calculator
interface ReturnArgs {
    target: number
    hoursArr: number[]
}

const parseArguments = (args: string[]): ReturnArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const hoursArr = args.slice(3);
    const hoursAsNumbers = hoursArr.map(value => Number(value));

    if (!isNaN(target) && hoursAsNumbers.every(value => !isNaN(value))) {
        return {
            target,
            hoursArr: hoursAsNumbers
        };
    } else {
        throw new Error('Provided values are not numbers!');
    }
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercisesCL = (target: number, hoursPerDay: number[]): Result => {
    const periodLength = hoursPerDay.length;
    const trainingDays = hoursPerDay.filter(day => day > 0).length;
    const totalHours = hoursPerDay.reduce((acc, curr) => acc + curr, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Good job! You met your target.';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not bad, but you can do better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to put in more effort.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

try {
    const {target, hoursArr} = parseArguments(process.argv);
    const result = calculateExercisesCL(target, hoursArr);
    console.log(result);
} catch (error: unknown) {
    let errorMsg = 'Something went wrong.';
    if (error instanceof Error) {
        errorMsg += ' Error: ' + error.message;
    }
    console.log(errorMsg);
}

