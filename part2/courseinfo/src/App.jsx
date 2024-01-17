import Course from "./components/Course/Course.jsx";

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    const total = courses[0].parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    const totalNode = courses[1].parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <Course courses={courses} total={total} totalNode={totalNode}/>
        </div>
    )
}

export default App