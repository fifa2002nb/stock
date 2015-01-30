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
        $data = $Cache->get("psostock_F4A1A5A86A9F83D818ACC8E4FFCA56F9");
        $dataarray = json_decode($data, true);
        /*$newarray = array();
        for($i = 0; $i < 10; $i++){
            $newarray["data"][] = $dataarray["data"][$i];
        }
        $newarray["types"] = $dataarray["types"];
        $newarray["names"] = $dataarray["names"];*/
        //Log::write('xxxxxxxxxxxxxxx_z '.$newarray, "WEB_LOG_DEBUG");
        $this->response($dataarray);
    }

} 
