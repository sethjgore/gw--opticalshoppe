<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
* '0.0.0.0' => array(
*		'server' => 'localhost',
*		'user' => 'admin',
*		'password' => 'admin',
*		'database' => 'gatorworks--opticalshoppe',
*	),
 */

return array(

	'*' => array(
		'tablePrefix' => 'craft'
	),
	'0.0.0.0' => array(
		'server' => 'localhost',
		'user' => 'admin',
		'password' => 'admin',
		'database' => 'gatorworks--opticalshoppe',
	),
	'192.168.0.6' => array(
		'server' => 'localhost',
		'user' => 'admin',
		'password' => 'admin',
		'database' => 'gatorworks--opticalshoppe',
	),
	'gww.gwwork.com' => array(
		'server' => 'localhost',
		'user' => 'optical_admin',
		'password' => 'Thenumber3',
		'database' => 'optical_shoppe',
	),
	'clients.sjgore.com' => array(
		'server' => 'db521006607.db.1and1.com',
		'user' => 'dbo521006607',
		'password' => 'Thenumber3',
		'database' => 'db521006607',
		)

);
