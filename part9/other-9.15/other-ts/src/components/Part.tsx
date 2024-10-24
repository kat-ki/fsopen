import {CoursePart} from "../App.tsx";

interface PartProps {
    course: CoursePart
}

const Part = ({course}: PartProps) => {
    switch (course.kind) {
        case "basic":
            return (
                <>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>{course.description}</p>
                </>
            );
        case "background":
            return (
                <>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>{course.description}</p>
                    <p>Find materials at: {course.backgroundMaterial}</p>
                </>
            );
        case "group":
            return (
                <>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>Projects: {course.groupProjectCount}</p>
                </>
            );
        case "special":
            return (
                <>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>{course.description}</p>
                    Required Skills:
                    <ul>
                        {course.requirements.map((r, index) => (
                            <li key={index}>{r}</li>))}
                    </ul>
                </>
            );
    }
};

export default Part;