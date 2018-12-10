import DataEntry from 'components/table/dataEntry';
import * as React from 'react';
import Store from '../store';
export default {
    // 仓库编号 string 
    whCode:<DataEntry Store={Store}  placeholder='仓库编号'  />,
    // 仓库名称 string 
    whName:<DataEntry Store={Store}  placeholder='仓库名称'  />,
    // 仓库级别 string 
    whLevel:<DataEntry Store={Store}  placeholder='仓库级别'  />,
    // 仓库服务商编号 string 
    providerCode:<DataEntry Store={Store}  placeholder='仓库服务商编号'  />,
    // 主键ID integer 
    id:<DataEntry Store={Store}  placeholder='主键ID'  />,
    // 是否实仓 integer 
    isReal:<DataEntry Store={Store}  format="int32"  placeholder='是否实仓'  />,
    // 地址 string 
    addr:<DataEntry Store={Store}  placeholder='地址'  />,
    // 负责人 string 
    manager:<DataEntry Store={Store}  placeholder='负责人'  />,
    // 负责人电话 string 
    managerTel:<DataEntry Store={Store}  placeholder='负责人电话'  />,
    // 负责人E-mail string 
    managerEmail:<DataEntry Store={Store}  placeholder='负责人E-mail'  />,
    // 省份编号 string 
    provinceCode:<DataEntry Store={Store}  placeholder='省份编号'  />,
    // 城市编号 string 
    cityCode:<DataEntry Store={Store}  placeholder='城市编号'  />,
    // 区县编号 string 
    areaCode:<DataEntry Store={Store}  placeholder='区县编号'  />,
    // 面积 string 
    acreage:<DataEntry Store={Store}  placeholder='面积'  />,
    // 容积 string 
    cubage:<DataEntry Store={Store}  placeholder='容积'  />,
    // 经度 string 
    longitude:<DataEntry Store={Store}  placeholder='经度'  />,
    // 纬度 string 
    latitude:<DataEntry Store={Store}  placeholder='纬度'  />
}