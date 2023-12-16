import { Bar } from "react-chartjs-2";
import { useGetManagerInfoQuery } from "../../../api/manager-api";
import Container from "../../../components/ui/container";

const ManagerHomeDashboard = () => {
  const { data } = useGetManagerInfoQuery(undefined);

  const chartData = {
    labels: [
      "rooms",
      "currentBooking",
      "pendingBooking",
      "totalBooking",
      "totalCustomer",
    ],
    datasets: [
      {
        label: "Dashboard Stats",
        backgroundColor: [
          "rgba(255,99,132,0.4)",
          "rgba(54,162,235,0.4)",
          "rgba(255,206,86,0.4)",
          "rgba(75,192,192,0.4)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
        ],
        hoverBorderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
        ],
        data: [
          data?.rooms || 0,
          data?.currentBooking || 0,
          data?.pendingBooking || 0,
          data?.totalBooking || 0,
          data?.totalCustomer || 0,
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <div className="my-4 border p-4 rounded-lg">
        <div className="md:grid grid-cols-5 gap-2">
          <div>
            <p>Total Rooms</p>
            <h6>{data?.rooms || 0}</h6>
          </div>
          <div>
            <p>Current Booking</p>
            <h6>{data?.currentBooking || 0}</h6>
          </div>
          <div>
            <p>Pending Booking</p>
            <h6>{data?.pendingBooking || 0}</h6>
          </div>
          <div>
            <p>Total Booking</p>
            <h6>{data?.totalBooking || 0}</h6>
          </div>
          <div>
            <p>Total Customer</p>
            <h6>{data?.totalCustomer || 0}</h6>
          </div>
        </div>
      </div>
      <div className="max-w-5xl">
        <Bar data={chartData} options={options} />
      </div>
    </Container>
  );
};

export default ManagerHomeDashboard;
