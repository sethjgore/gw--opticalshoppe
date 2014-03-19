<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    'devMode' => true,
    'useCompressedJs' => false,
    '*' => array(
        'omitScriptNameInUrls' => true,
    ),
    'localhost:9999' => array(
        'devMode' => true,

        'environmentVariables' => array(
            'siteUrl'        => 'http://localhost:9999/clients/gatorworks/opticalshoppe',
            'fileSystemPath' => '/'
        )
    ),

    'example.com' => array(
        'cooldownDuration' => 0,

        'environmentVariables' => array(
            'siteUrl'        => 'http://example.com/',
            'fileSystemPath' => '/www/eh12345/'
        )
    )
);