import BasicInfo from "./basicInfo";
import VehicleLogin from "./vehicleLogin";
import VehicleLogout from "./vehicleLogout";
import PlatformLogin from "./platformLogin";
import PlatformLogout from "./platformLogout";
import MessageReport from "./messageReport";

const packages = {
  basicInfo: BasicInfo,
  "01": VehicleLogin,
  "02": MessageReport,
  "03": MessageReport,
  "04": VehicleLogout,
  "05": PlatformLogin,
  "06": PlatformLogout,
};

// packages.basicInfo = BasicInfo;
// packages.vehicleLogin = VehicleLogin;
// packages.vehicleLogout = VehicleLogout;
// packages.platformLogin = PlatformLogin;
// packages.platformLogout = PlatformLogout;
// packages.currentMessageReport = MessageReport;
// packages.supplementMessageReport = MessageReport;

export default packages;
