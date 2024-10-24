import Part from "./Part.tsx";
import {CoursePart} from "../App.tsx";

interface ContentProps {
    course: CoursePart[]
}

const Content = ({course}: ContentProps) => {
    return (
        <div>
            {course.map((c, index) => (
                <Part key={index} course={c}/>
            ))}
        </div>
    );
};

export default Content;