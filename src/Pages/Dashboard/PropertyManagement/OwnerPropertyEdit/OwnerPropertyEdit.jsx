import { useParams } from "react-router-dom";

const OwnerPropertyEdit = () => {
    const { propertyId } = useParams();
console.log(propertyId);

    return (
        <div>
            <h2>Edit Property</h2>
        </div>
    );
};

export default OwnerPropertyEdit;