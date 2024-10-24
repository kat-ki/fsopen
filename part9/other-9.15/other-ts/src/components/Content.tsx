
interface ContentPart {
    name: string,
    exerciseCount: number
}
const Content = (props: ContentPart[]): JSX.Element => {
    const {course} = props;
    return (
        <div>
            {course.map((c, index) => (
                <p key={index}>{c.name} {c.exerciseCount}</p>
            ))}
        </div>
    );
};

export default Content;