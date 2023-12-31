import {useEffect, useRef} from "react";
import {useAppSelector} from "../../../redux/hooks";
import Chart from "chart.js/auto";
import {
  useGetHotelsAdminQuery,
  useGetUsersAdminQuery,
} from "../../../api/admin-api";

const AdminChart: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user.role === "ADMIN";
  const usersData = useAppSelector((state: any): any => state.users); // Replace with actual user data from Redux

  const {data} = useGetUsersAdminQuery({
    length: true,
  });

  const {data: hotelsData} = useGetHotelsAdminQuery(undefined); // Updated to get hotel data

  // Reference to the canvas elements where the charts will be rendered
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (
      isAdmin &&
      pieChartRef.current &&
      barChartRef.current &&
      data &&
      hotelsData
    ) {
      // Destroy the existing chart instances on the canvas
      if (pieChartRef.current && (pieChartRef.current as any).__chart) {
        (pieChartRef.current as any).__chart.destroy();
      }
      if (barChartRef.current && (barChartRef.current as any)?.__chart) {
        (barChartRef.current as any).__chart.destroy();
      }

      // Create the data for the pie chart
      const userDataCount = {
        Customers: data?.CUSTOMER || 0,
        Managers: data?.MANAGER || 0,
        Admins: data?.ADMIN || 0,
      };

      // Count the number of users in each category
      const userData = usersData || [];
      userData.forEach((user: any) => {
        if (user.role === "CUSTOMER") {
          userDataCount.Customers += 1;
        } else if (user.role === "MANAGER") {
          userDataCount.Managers += 1;
        } else if (user.role === "ADMIN") {
          userDataCount.Admins += 1;
        }
      });

      const pieChartData = {
        labels: ["Customers", "Managers", "Admins"],
        datasets: [
          {
            data: [
              userDataCount.Customers,
              userDataCount.Managers,
              userDataCount.Admins,
            ],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          },
        ],
      };

      const pieChartConfig: any = {
        type: "pie",
        data: pieChartData,
      };

      // Create the pie chart
      (pieChartRef.current as any).__chart = new Chart(
        pieChartRef.current,
        pieChartConfig
      );

      // Extract hotel status data from the hotelsData
      const hotelStatusData = hotelsData.map((hotel: any) => hotel.status);

      // Count the number of hotels with different statuses
      const hotelDataCount = {
        APPROVED: hotelStatusData.filter(
          (status: string) => status === "APPROVED"
        ).length,
        REJECTED: hotelStatusData.filter(
          (status: string) => status === "REJECTED"
        ).length,
        PENDING: hotelStatusData.filter(
          (status: string) => status === "PENDING"
        ).length,
      };

      const barChartData = {
        labels: ["APPROVED", "REJECTED", "PENDING"],
        datasets: [
          {
            label: "Hotel Status",
            data: [
              hotelDataCount.APPROVED,
              hotelDataCount.REJECTED,
              hotelDataCount.PENDING,
            ],
            backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
          },
        ],
      };

      const barChartConfig: any = {
        type: "bar",
        data: barChartData,
        options: {
          plugins: {
            legend: false, // Hide the legend
            datalabels: {
              anchor: "end",
              align: "end",
              font: {
                weight: "bold",
              },
              color: "black",
              formatter: (value: any) => value, // Show the actual value on top of the bars
            },
          },
        },
      };

      // Create the bar chart
      (barChartRef.current as any).__chart = new Chart(
        barChartRef.current,
        barChartConfig
      );
    }
  }, [isAdmin, usersData, data, hotelsData]);

  return (
    <div className="p-4 border-2 border-secondary-200 border-dashed rounded-lg dark:border-secondary-800">
      {isAdmin && (
        <div className="mt-4 border p-4 rounded-lg shadow-lg">
          {/* <h3 className="text-xl text-center my-4 font-semibold">
            Admin Dashboard
          </h3> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold">Total Hotels</h4>
              {/* Assume you have access to totalRooms for the admin */}
              <p className="text-2xl font-bold text-primary-500">
                {hotelsData?.length}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Total Users</h4>
              {/* Assume you have access to totalUsers for the admin */}
              <p className="text-2xl font-bold text-primary-500">
                {data?.USERS}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="md:flex justify-around">
        <div className="text-center">
          <div className="mt-4 w-80">
            <canvas ref={pieChartRef} width={200} height={200}></canvas>
          </div>
          <p className="text-lg font-medium">Users Pie Chart</p>
        </div>

        <div className="text-center">
          <div className="mt-4 w-80">
            <canvas ref={barChartRef} width={200} height={200}></canvas>
          </div>
          <p className="text-lg font-medium">Hotel Status Bar Chart</p>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
