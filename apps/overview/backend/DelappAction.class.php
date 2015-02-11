<?php
/**
 * Created by xuye@baidu.com.
 * User: xuye
 * Date: 1/30/15
 */

class DelappAction extends CommonAction {

    public function update(){
        $putData = $_POST;
        $uid = abs(intval($_GET["id"]));
        $taskname = htmlspecialchars($putData["appname"]);
        $user_id = $uid;

        $constantTask = M("Constant_task");
        $res = $constantTask->where("taskname=\"$taskname\" and user_id=$uid")->delete();
        
        //refresh the task distribution module
        $url = "http://www.mtrix.io:8456/developerfcgi?refresh_tasks";
        request_get($url);
        
        $this->response(array("message" => "delete $taskname succ $res"));
        //Log::write('xxxxxxxxxxxxxxx_z '.$taskname."|".$symbol."|".$market."|".$frequency."|".$computedays."|".$create_time."|".$expire_time."|".$status."|".$user_id, "WEB_LOG_DEBUG");
    }
} 
