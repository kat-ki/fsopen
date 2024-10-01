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

