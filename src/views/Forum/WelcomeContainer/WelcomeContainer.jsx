import { Outlet } from "react-router-dom";


export default function WelcomeContainer() {
  // const { categoryId } = useParams();
  console.log("WelcomeContainer -> ")

  return (
    <div>
      <Outlet />
    </div>
  );
}
