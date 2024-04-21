import { Link, useNavigate } from "react-router-dom";

const Activities = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Atividades</h1>
      <Link to="/activities">Atividades</Link>
      <button onClick={() => navigate("/activities/tasks")}>Tarefas</button>
    </>
  );
};

export default Activities;
