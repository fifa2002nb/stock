<?php
/**
 * Created by xuye@baidu.com.
 * User: xuye
 * Date: 1/30/15
 */

class DashboardAction extends CommonAction {

    /*
     * 根据日期查看
     * 支持：当日，当月，当年，日期开始-》结束
     * **/
    public function index() {

        $uid = intval($_GET["uid"]);
        $taskname = htmlspecialchars($_GET["taskname"]);
        $constantTask = M("Constant_task");
        if("null" == $taskname){
            $list = $constantTask->where("user_id=$uid")->select();
        }
        else
            $list = $constantTask->where("taskname=\"$taskname\" and user_id=$uid")->select();
        //Log::write('xxxxxxxxxxxxxxx_z '.$constantTask->getLastsql(), "WEB_LOG_DEBUG");
        if(0 == count($list)){
            $this->response(array());
        }
        else{
            $symbol = $list[0]['symbol'];
            $taskname = $list[0]['taskname'];
            $user_id = $list[0]['user_id'];
            $key = "psostock_".strtoupper(md5($symbol.$taskname.$user_id));
            $Cache = Cache::getInstance('redis', array('host'=>'10.10.100.14', 'port'=>6379, 'expire'=>600));
            $data = $Cache->get($key);
            $dataarray = json_decode($data, true);
            $this->response($dataarray);
        }
    }

} 
