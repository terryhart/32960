export const ABNORMAL = "ABNORMAL";
export const VEHICLE_STATUS = ["ON", "OFF", "OTHER"]; // 车辆状态: 启动, 熄火
export const CHARGE_STATUS = ["PARK_CHARGING", "MOVE_CHARGING", "UNCHARGED", "CHARGED"]; // 充电状态: 停车充电, 行驶充电, 未充电状态, 充电完成
export const VEHICLE_MODE = ["ELECTRIC", "MIXED", "FUEL"]; // 车辆模式: 纯电, 混合, 燃油
export const DC_STATUS = ["ON", "OFF"]; // DC-DC 状态: 工作, 断开
export const ENGINE_STATUS = ["ON", "OFF"]; // 发动机状态: 工作, 断开
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
]; // 车辆档位
export const MOTOR_STATUS = ["CONSUMPTION", "GENERATION", "OFF", "READY"]; // 耗电, 发电, 关闭, 准备
export const AIR_MODE = ["OFF", "WIND", "HEATING", "REFRIGERATION"]; // 空调模式: 关闭, 进风, 制热, 制冷
export const DOOR_STATUS = ["CLOSE", "OPEN", "ABNORMAL"]; // 门状态: 关闭, 开, 异常
export const HANDBRAKE_STATUS = ["OFF", "ON", "ABNORMAL"]; // 手刹状态: 松, 刹, 异常
export const KEY_POSITION = ["OFF", "ACC", "ON", "START"]; // 钥匙位置
