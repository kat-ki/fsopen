type CourseName = {
    title: string
}
const Header = ({title}: CourseName) => {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
};

export default Header;