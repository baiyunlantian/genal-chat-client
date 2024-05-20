import { useService } from 'umi';

/** 泛在物联监测信息 */
export interface IDataMonitorParam {
  /** 空调数量  */
  airConditionerCount: number;
  /** 空调功率  */
  airConditionerPower: number;
  /** 充电桩数量  */
  chargingPileCount: number;
  /** 充电桩功率  */
  chargingPilePower: number;
  /** 储能容量  */
  energyStorageCapacity: number;
  /** 储能数量  */
  energyStorageCount: number;
  /** 储能功率  */
  energyStoragePower: number;
  /** 设备容量  */
  equipmentTotalCapacity: number;
  /** 设备数量  */
  equipmentTotalCount: number;
  /** 其他设备数量  */
  otherCount: number;
  /** 其他设备功率  */
  otherPower: number;
  /** 光伏数量  */
  photovoltaicCount: number;
  /** 光伏功率  */
  photovoltaicPower: number;
  /** 发电装机（kWp）  */
  powerGeneration: number;
  /** 负荷装机（kW）  */
  ratedLoad: number;
  /** 储能装机（kWh）  */
  storageCapacity: number;
  [key: string]: any;
}

export const useMonitorService = () => {
  // 光伏实时监测-查询光伏整体监视
  const {
    data: retrieveData,
    run: retrieveRun,
    loading: retrieveLoading,
  } = useService<{ data: IDataMonitorParam }>({
    url: '/analysis/ems/home/queryUbiquitousIotMonitorInfo',
    method: 'get',
    onSuccess: () => {},
  });

  return {
    retrieveData,
    retrieveRun,
    retrieveLoading,
  };
};
