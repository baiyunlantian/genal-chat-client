import { useService } from 'umi';

/** 设备状态信息 */
export interface IAirConditionerParam {
  /** 设备总数  */
  equipmentTotalCount: number;
  /** 发电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  generateElectricQuantity: number;
  /** 用电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  useElectricQuantity: number;
  /** 离线数量  */
  offLineCount: number;
  /** 在线数量  */
  onLineCount: number;
  /** 聚合容量  */
  polymerizationCapacity: number;
  [key: string]: any;
}

/** 设备状态信息 */
export interface IChargingPileParam {
  /** 设备总数  */
  equipmentTotalCount: number;
  /** 发电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  generateElectricQuantity: number;
  /** 用电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  useElectricQuantity: number;
  /** 离线数量  */
  offLineCount: number;
  /** 在线数量  */
  onLineCount: number;
  /** 聚合容量  */
  polymerizationCapacity: number;
  [key: string]: any;
}

/** 设备状态信息 */
export interface IEnergyStorageParam {
  /** 设备总数  */
  equipmentTotalCount: number;
  /** 发电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  generateElectricQuantity: number;
  /** 用电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  useElectricQuantity: number;
  /** 离线数量  */
  offLineCount: number;
  /** 在线数量  */
  onLineCount: number;
  /** 聚合容量  */
  polymerizationCapacity: number;
  [key: string]: any;
}

/** 设备状态信息 */
export interface IOtherParam {
  /** 设备总数  */
  equipmentTotalCount: number;
  /** 发电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  generateElectricQuantity: number;
  /** 用电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  useElectricQuantity: number;
  /** 离线数量  */
  offLineCount: number;
  /** 在线数量  */
  onLineCount: number;
  /** 聚合容量  */
  polymerizationCapacity: number;
  [key: string]: any;
}

/** 设备状态信息 */
export interface IPhotovoltaicParam {
  /** 设备总数  */
  equipmentTotalCount: number;
  /** 发电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  generateElectricQuantity: number;
  /** 用电容量(对应前端充电桩、储能、空调、其他、光伏显示xxx kWh)  */
  useElectricQuantity: number;
  /** 离线数量  */
  offLineCount: number;
  /** 在线数量  */
  onLineCount: number;
  /** 聚合容量  */
  polymerizationCapacity: number;
  [key: string]: any;
}

/** 能量流动信息 */
export interface IDataEMSParam {
  /** 设备状态信息  */
  airConditioner: IAirConditionerParam;
  /** 设备状态信息  */
  chargingPile: IChargingPileParam;
  /** 设备状态信息  */
  energyStorage: IEnergyStorageParam;
  /** 设备状态信息  */
  other: IOtherParam;
  /** 设备状态信息  */
  photovoltaic: IPhotovoltaicParam;
  /** 电网  */
  powerGrid: number;
  [key: string]: any;
}

export const useEMSService = () => {
  // 查询能量流动信息
  const {
    data: retrieveData,
    run: retrieveRun,
    loading: retrieveLoading,
  } = useService<{ data: IDataEMSParam }>({
    url: '/analysis/ems/home/queryEnergyFlowInfo',
    method: 'get',
    onSuccess: () => {},
  });

  return {
    retrieveData,
    retrieveRun,
    retrieveLoading,
  };
};
