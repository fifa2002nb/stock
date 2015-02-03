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

        $quick = $_GET["_filter_timeStep"];
        $starttime = strtotime($_GET["_filter_start_dateline"]);
        $endtime = strtotime($_GET["_filter_end_dateline"]);

        $map = array(
            "status" => array("EGT", 1),
            "dateline" => array("BETWEEN", array($starttime, $endtime))
        );

        $Cache = Cache::getInstance('redis', array('host'=>'10.10.100.14', 'port'=>6379, 'expire'=>600));
        $data = $Cache->get("psostock_00750244AD67024AD7AAD529EDBEB056");
        $dataarray = json_decode($data, true);
        $this->response($dataarray);
    }

} 
