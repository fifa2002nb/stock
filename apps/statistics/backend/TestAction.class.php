<?php
/**
 * Created by PhpStorm.
 * User: nemo
 * Date: 6/18/14
 * Time: 13:51
 */

class TestAction extends CommonAction {

    /*
     * 根据日期查看
     * 支持：当日，当月，当年，日期开始-》结束
     * **/
    public function index() {

        $quick = $_GET["_filter_timeStep"];
        $starttime = strtotime($_GET["_filter_start_dateline"]);
        $endtime = strtotime($_GET["_filter_end_dateline"]);

        $map = array(
            "status" => array("EGT", 1),
            "dateline" => array("BETWEEN", array($starttime, $endtime))
        );

        $Cache = Cache::getInstance('redis', array('host'=>'10.10.100.14', 'port'=>6379, 'expire'=>600));
        $data = $Cache->get("psostock_5B6A8184141B4EA730FC8C033CD42985");
        //Log::write('这里记录一下'.$data, "WEB_LOG_DEBUG");
        $this->response($data, "json_string");
    }

} 
