<?php
namespace Craft;

class Directory_PluginModel extends BaseModel
{
    protected function defineAttributes()
    {
        return array(
			'name'        => array(AttributeType::String, 'required' => true),
			'class'        => array(AttributeType::String, 'required' => true),
			'description'  => array(AttributeType::String, 'required' => true),
			'developer'    => array(AttributeType::String, 'required' => true),
			'developerUrl' => array(AttributeType::String, 'required' => true),
			'handle'       => array(AttributeType::String, 'required' => true),
			'url'          => array(AttributeType::String, 'required' => false),
			'path'         => array(AttributeType::String, 'required' => false),
			'zip'          => array(AttributeType::String, 'required' => false),
			'githubRepo'   => array(AttributeType::String, 'required' => false),
			'githubUser'   => array(AttributeType::String, 'required' => false),
        );
    }

    public function isDownloadable()
    {
    	if(!empty($this->zip)) {
    		return true;
    	} elseif(!empty($this->githubRepo) && !empty($this->githubUser)) {
    		return true;
    	}

    	return false;
    }
}
