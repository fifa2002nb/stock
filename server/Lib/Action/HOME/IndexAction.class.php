<?php

class IndexAction extends CommonAction {

    public function index() {

        if(!is_file(APP_PATH."/Data/install.lock")) {
            return;
        }
        $this->assign("isDebug", APP_DEBUG ? 'true' : 'false');
        $this->assign("APP_DEBUG", APP_DEBUG);
        $this->assign("siteTitle", "MILES");
        $this->display("index");
    }
}
