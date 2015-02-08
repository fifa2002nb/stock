<?php
/**
 * Created by xuye@baidu.com.
 * User: xuye
 * Date: 1/30/15
 */

class OverviewAction extends CommonAction {

    /*
     * 根据日期查看
     * 支持：当日，当月，当年，日期开始-》结束
     * **/
    public function index() {
        $starttime = strtotime($_GET["_filter_start_dateline"]);
        $endtime = strtotime($_GET["_filter_end_dateline"]);
        $uid = intval($_GET["uid"]);

        $constantTask = M("Constant_task");
        $list = $constantTask->where("user_id = $uid")->select();
        //Log::write('xxxxxxxxxxxxxxx_z '.var_dump($list), "WEB_LOG_DEBUG"); 
         
        //$dataarray = array("id" => $uid, "length" => count($list), "create_time" => $list[0]["create_time"]);
        $dataarray = $list;
        $this->response($dataarray);
    }

} 
