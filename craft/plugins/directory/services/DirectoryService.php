<?php

/**
 * Craft Directory by Dukt
 *
 * @package   Craft Directory
 * @author    Benjamin David
 * @copyright Copyright (c) 2013, Dukt
 * @license   http://docs.dukt.net/craft/directory/docs
 * @link      http://dukt.net/craft/directory
 */

namespace Craft;

require_once(CRAFT_PLUGINS_PATH.'directory/vendor/autoload.php');

use VIPSoft\Unzip\Unzip;
use Symfony\Component\Filesystem\Filesystem;

class DirectoryService extends BaseApplicationComponent
{
    public function plugins()
    {
        // straight up craft

        $plugins = "http://straightupcraft.com/craft-plugins/api.json";


        // old directory plugins api
        // $plugins = "https://raw.github.com/dukt/directory.craft/master/config/plugins.json";


        // local
        // $plugins = CRAFT_PLUGINS_PATH.'directory/config/plugins.json';


        $plugins = file_get_contents($plugins);


        $plugins = json_decode($plugins, true);

        $models = Directory_PluginModel::populateModels($plugins);

        return $models;
    }

    public function download($key)
    {
        $r = array(
                'success' => false
            );

        $filesystem = new Filesystem();
        $unzipper  = new Unzip();

        $plugins = craft()->directory->plugins();

        if(isset($plugins[$key])) {
            $plugin = $plugins[$key];

            $className = $plugin->class;

            $pluginComponent = craft()->plugins->getPlugin($className, false);

            // download & unzip

            // is github or zip ?

            if(!empty($plugin->zip)) {
                $pluginZipUrl = $plugin->zip;
            } elseif(!empty($plugin->githubUser) && !empty($plugin->githubRepo)) {
                $pluginZipUrl = "https://github.com/".$plugin->githubUser."/".$plugin->githubRepo."/archive/master.zip";
            }


            // plugin path

            $pluginPath = "";

            if(isset($plugin->path)) {
                $pluginPath = $plugin->path;
            }


            $pluginZipDir = CRAFT_PLUGINS_PATH."_".$plugin->handle."/";
            $pluginZipPath = CRAFT_PLUGINS_PATH."_".$plugin->handle.".zip";

            try {
                // download

                $current = file_get_contents($pluginZipUrl);

                file_put_contents($pluginZipPath, $current);


                // unzip

                $content = $unzipper->extract($pluginZipPath, $pluginZipDir);

                // make a backup here ?

                $filesystem->remove(CRAFT_PLUGINS_PATH.$plugin->handle);
                $filesystem->rename($pluginZipDir.$content[0].'/'.$pluginPath, CRAFT_PLUGINS_PATH.$plugin->handle);
            } catch (\Exception $e) {
                $r['msg'] = $e->getMessage();
                return $r;
            }

            try {
                // remove download files

                $filesystem->remove($pluginZipDir);
                $filesystem->remove($pluginZipPath);
            } catch(\Exception $e) {
                $r['msg'] = $e->getMessage();

                return $r;
            }

            $r['success'] = true;
            return $r;
        } else {
            $r['msg'] = 'main failure';
            return $r;
        }
    }

    public function install($key)
    {
        $r = array(
            'success' => false
        );

        $plugins = craft()->directory->plugins();

        if(isset($plugins[$key])) {
            $plugin = $plugins[$key];

            $pluginComponent = craft()->plugins->getPlugin($plugin->class, false);

            try {
                if($pluginComponent && !$pluginComponent->isInstalled) {
                    if (craft()->plugins->installPlugin($plugin->class)) {
                        $r['success'] = true;
                    } else {
                        $r['msg'] = 'Couldn’t install plugin.';
                    }
                } else {
                    $r['success'] = true;
                }
            } catch(\Exception $e) {
                $r['msg'] = 'Couldn’t install plugin.';
            }
        } else {
            $r['msg'] = 'Couldn’t install plugin.';
        }

        return $r;
    }

    public function uninstall($key) {
        $plugins = craft()->directory->plugins();

        if(isset($plugins[$key])) {
            $plugin = $plugins[$key];

            $pluginComponent = craft()->plugins->getPlugin($plugin->class);

            if (craft()->plugins->uninstallPlugin($plugin->class)) {
                $r['success'] = true;
            } else {
                $r['msg'] = 'Couldn’t uninstall plugin.';
            }
        } else {
            $r['msg'] = 'Couldn’t uninstall plugin.';
        }

        return $r;
    }
}
