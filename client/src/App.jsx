import "./App.css";
import MainPage from "./components/MainPage";
import axios from "axios";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SampleForm from "./components/sampleForm";
import Bills from "./components/AdminBills";
import BillShare from "./components/BillShare";
import { useIsMobile } from "./external/vite-sdk";

const DairyWrapper = () => {
  const { dairyName } = useParams();

  return (
    <Routes>
      <Route path="/" element={<MainPage dairyName={dairyName} />} />
      <Route path="sampleForm" element={<SampleForm dairyName={dairyName} />} />
      <Route path="bills/:year/:month" element={<BillsRouteWrapper dairyName={dairyName} />} />
      <Route path="bills" element={<BillsRouteWrapper dairyName={dairyName} />} />
      <Route path="bills/share/:userId" element={<BillShareRouteWrapper dairyName={dairyName} />} />
    </Routes>
  );
};

const BillShareRouteWrapper = ({ dairyName }) => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  return (
    <BillShare
      billId={userId}
      selectedMonth={month}
      selectedYear={year}
      dairyName={dairyName}
      onClose={() => window.history.back()}
    />
  );
};

// Wrapper for Bills
const BillsRouteWrapper = ({ dairyName }) => {
  const { year, month } = useParams();
  const today = new Date();
  const defaultMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const defaultYear = today.getFullYear().toString();

  return (
    <Bills
      initialYear={year || defaultYear}
      initialMonth={month || defaultMonth}
      dairyName={dairyName}
    />
  );
};

function App() {
  axios.defaults.withCredentials = true;
  window.maxCnt = useIsMobile() ? 2 : 5;

  return (
    <Router>
      <Routes>
        <Route path="/:dairyName/*" element={<DairyWrapper />} />
       <Route path="/" element={<div>Please enter a dairy name in URL</div>} />
      </Routes>
    </Router>
  );
}

export default App;





// import "./App.css";
// import MainPage from "./components/MainPage";
// import axios from "axios";
// import {
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import SampleForm from "./components/sampleForm";
// import Bills from "./components/AdminBills";
// import BillShare from "./components/BillShare";
// import { useIsMobile } from "./external/vite-sdk";

// const BillShareRouteWrapper = () => {
//   const { userId } = useParams();
//   const [searchParams] = useSearchParams();
//   const month = searchParams.get("month");
//   const year = searchParams.get("year");

//   return (
//     <BillShare
//       billId={userId}
//       selectedMonth={month}
//       selectedYear={year}
//       onClose={() => window.history.back()}
//     />
//   );
// };

// const BillsRouteWrapper = () => {
//   const { year, month } = useParams();
//   const today = new Date();
//   const defaultMonth = (today.getMonth() + 1).toString().padStart(2, "0");
//   const defaultYear = today.getFullYear().toString();

//   return (
//     <Bills
//       initialYear={year || defaultYear}
//       initialMonth={month || defaultMonth}
//     />
//   );
// };

// function App() {
//   axios.defaults.withCredentials = true;
//   window.maxCnt = useIsMobile() ? 2 : 5;
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/sampleForm" element={<SampleForm />} />

//           <Route path="/bills/:year/:month" element={<BillsRouteWrapper />} />
//           <Route path="/bills" element={<BillsRouteWrapper />} />
//           <Route
//             path="/bills/share/:userId"
//             element={<BillShareRouteWrapper />}
//           />
//         </Routes>
//       </Router>
//     </>
//   );
// }
// export default App;
