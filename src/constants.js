export const ABNORMAL = "ABNORMAL";
export const VEHICLE_STATUS = { ON: "ON", OFF: "OFF", OTHER: "OTHER" }; // 车辆状态: 启动, 熄火

// 充电状态
export const CHARGE_STATUS = {
  PARK_CHARGING: "PARK_CHARGING", // 停车充电
  MOVE_CHARGING: "MOVE_CHARGING", // 行驶充电
  UNCHARGED: "UNCHARGED", // 未充电状态
  CHARGED: "CHARGED", // 充电完成
};
export const VEHICLE_MODE = { ELECTRIC: "ELECTRIC", MIXED: "MIXED", FUEL: "FUEL" }; // 车辆模式: 纯电, 混合, 燃油
export const DC_STATUS = { ON: "ON", OFF: "OFF" }; // DC-DC 状态: 工作, 断开
export const ENGINE_STATUS = { ON: "ON", OFF: "OFF" }; // 发动机状态: 工作, 断开

// 车辆档位
export const VEHICLE_SHIFT = [
  "N",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "R",
  "D",
  "P",
];
// 耗电, 发电, 关闭, 准备
export const MOTOR_STATUS = {
  CONSUMPTION: "CONSUMPTION",
  GENERATION: "GENERATION",
  OFF: "OFF",
  READY: "READY",
};

// 空调模式: 关闭, 进风, 制热, 制冷
export const AIR_MODE = {
  OFF: "OFF",
  WIND: "WIND",
  HEATING: "HEATING",
  REFRIGERATION: "REFRIGERATION",
};

export const DOOR_STATUS = { CLOSE: "CLOSE", OPEN: "OPEN", ABNORMAL: "ABNORMAL" }; // 门状态: 关闭, 开, 异常
export const HANDBRAKE_STATUS = { OFF: "OFF", ON: "ON", ABNORMAL: "ABNORMAL" }; // 手刹状态: 松, 刹, 异常
export const KEY_POSITION = { OFF: "OFF", ACC: "ACC", ON: "ON", START: "START" }; // 钥匙位置

// 命令标志
export const COMMAND = {
  VEHICLE_LOGIN: "VEHICLE_LOGIN", // 车辆登入 0x01
  REALTIME_REPORT: "REALTIME_REPORT", // 实时信息上报 0x02
  REISSUE_REPORT: "REISSUE_REPORT", // 补发信息上报 0x03
  VEHICLE_LOGOUT: "VEHICLE_LOGOUT", // 车辆登出 0x04
  PLATFORM_LOGIN: "PLATFORM_LOGIN", // 平台登入0x05
  PLATFORM_LOGOUT: "PLATFORM_LOGOUT", // 平台登出0x06
  HEARTBEAT: "HEARTBEAT", // 心跳 0x07
  TIME: "TIME", // 车辆校时 0x08
};

// 应答标志
export const FLAG = {
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  VIN_DUP: "VIN_DUP",
  COMMAND: "COMMAND",
};

// 加密标志
export const ENCRYPT = {
  NONE: "NONE",
  RSA: "RSA",
  AES128: "AES128",
};

// 信息体
export const REPORT = {
  VEHICLE: "VEHICLE",
  MOTOR: "MOTOR",
  FUELCELL: "FUELCELL",
  ENGINE: "ENGINE",
  LOCATION: "LOCATION",
  EXTREME: "EXTREME",
  ALARM: "ALARM",
  RESS_VOLTAGE: "RESS_VOLTAGE",
  RESS_TEMPERATURE: "RESS_TEMPERATURE",
  CUSTOM_EXT: "CUSTOM_EXT",
  TEN_SECONDS: "TEN_SECONDS",
};

export const HEADER_LENGTH = 24;

export const MAX_LENGTH = 100 * 1024; // 100KB
