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

        //$orderModel = D($model);
        //$orderSourceData = $orderModel->where($map)->select();
//        echo $orderModel->getLastSql();exit;
        
        $data = array();
        $this->response($data);
    }

} 
