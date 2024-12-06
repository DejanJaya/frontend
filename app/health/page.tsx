import AddHealth from "./addHealth";
import DeleteHealth from "./deleteHealth";
import UpdateHealth from "./updateHealth";

export const metadata = {
  title: "Health List",
};

type Health = {
  id: number;
  name: string;
  address: string;
};

async function getHealths() {
  const res = await fetch("http://localhost:8080/health/getAll", {
    cache: "no-store",
  });
  return res.json();
}

export default async function HealthList() {
  const healths: Health[] = await getHealths();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddHealth />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Health Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {healths.map((health, index) => (
            <tr key={health.id}>
              <td>{index + 1}</td>
              <td>{health.name}</td>
              <td>{health.address}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateHealth {...health} />
                </div>

                <DeleteHealth {...health} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
