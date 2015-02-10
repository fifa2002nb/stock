<?php
/**
 * Created by xuye@baidu.com.
 * User: xuye
 * Date: 1/30/15
 */

class OverviewAction extends CommonAction {

    public function index() {
        $uid = intval($_GET["uid"]);
        $constantTask = M("Constant_task");
        $list = $constantTask->where("user_id = $uid")->select();
        $this->response($list);
    }

    public function update(){
        $putData = $_POST;
        $uid = abs(intval($_GET["id"]));
        $taskname = htmlspecialchars($putData["appname"]);
        $symbol = htmlspecialchars($putData["stocksymbol"]);
        $market = htmlspecialchars($putData["market"]);
        $frequency = abs(intval($putData["freq"]));
        $computedays = 12;
        $create_time = date("Y-m-d H:i:s", time()); 
        $expire_time = date("Y-m-d H:i:s", time() + 86400 * 365);
        $status = "running";
        $user_id = $uid;

        //验证股票代号
        $stocksInfo = M("stocks_info");
        $stockinfo = $stocksInfo->where("symbol=$symbol and market=$market")->select();
        if(0 == count($stockinfo)){
            $this->response(array("error" => "股票代号错误"));
            return;
        }
        $constantTask = M("Constant_task");
        $list = $constantTask->where("user_id=$uid")->select();
        $isduplicated = false;
        foreach($list as $index => $data){
            if($data["taskname"] == $taskname || $data["symbol"] == $symbol){
                $this->response(array("error" => "app重复创建"));
                return;
            }
        }
        //Log::write('xxxxxxxxxxxxxxx_z '.$taskname."|".$symbol."|".$market."|".$frequency."|".$computedays."|".$create_time."|".$expire_time."|".$status."|".$user_id, "WEB_LOG_DEBUG");
        unset($data["id"]);
        $data["taskname"] = $taskname;
        $data["symbol"] = $symbol;
        $data["market"] = $market;
        $data["frequency"] = $frequency;
        $data["computedays"] = $computedays;
        $data["create_time"] = $create_time;
        $data["expire_time"] = $expire_time;
        $data["status"] = $status;
        $data["user_id"] = $user_id;

        $constantTask->create($data);
        $constantTask->add();
        $this->response(array("message" => "success"));
    }
} 
