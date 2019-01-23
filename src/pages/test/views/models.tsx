import { Input, Switch, Icon, Select, Upload, message, Modal } from 'antd';
import * as React from 'react';
import Store from '../store';
export default {
    /** 产品组编号 string */  
    productGroupCode:<Input  placeholder='产品组编号'  />,
    /** 产品组名称 string */  
    productGroupName:<Input  placeholder='产品组名称'  />,
    /** 事业部 string */  
    buCode:<Input  placeholder='事业部'  />,
    /** DOA返回仓库 string */  
    doaWhCode:<Input  placeholder='DOA返回仓库'  />,
    /** 法人编号 string */  
    corpCode:<Input  placeholder='法人编号'  />,
    /** 主键 integer */  
    id:<Input  placeholder='主键'  />
}
