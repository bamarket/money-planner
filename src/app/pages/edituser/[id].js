import { useParams } from 'next/navigation';

const EditUser = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit User</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default EditUser;