import {Title} from "./Header/Title.jsx";
import {Header} from "./Header/Header.jsx";
import {Content} from "./Content/Content.jsx";
import {Total} from "./Content/Total.jsx";


const Course = ({courses, total}) => {
    return (
        <>
            <Title title={'Web development curriculum'}/>

            <Header course={courses[0].name}/>
            <Content parts={courses[0].parts}/>
            <Total sum={total[0]}/>

            <Header course={courses[1].name}/>
            <Content parts={courses[1].parts}/>
            <Total sum={total[1]}/>
        </>
    );
};

export default Course;