type TotalProps = {
    total: number
}
const Total = ({total}: TotalProps) => {
    return (
        <div>
            <h3> Number of exercises: {total}</h3>
        </div>
    );
};

export default Total;