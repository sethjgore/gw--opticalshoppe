<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
      'omitScriptNameInUrls'=>true
    ),
    '0.0.0.0' => array(
      'devMode' => true,
      'useCompressedJs' => false,
      'environmentVariables' => array(
            'siteUrl'        => 'http://0.0.0.0:9999/clients/gatorworks/opticalshoppe/',
            'fileSystemPath' => '/'
        )
    ),
    'gww.gwwork.com' => array(
      'devMode' => true,
      'useCompressedJs' => false,
      'environmentVariables' => array(
            'siteUrl'        => 'http://gww.gwwork.com/~optical/',
            'fileSystemPath' => '/'
        )
    ),
    'clients.sjgore.com' => array(
      'useCompressedJs' => false,
      'environmentVariables' => array(
            'siteUrl'        => 'http://clients.sjgore.com/opticalshoppe/',
            'fileSystemPath' => '/'
        )
    )
);
