<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

return [
    // Global settings
    '*' => [

        // Craft config settings from .env variables
		'aliases' => array(
			'basePath' => $_SERVER['DOCUMENT_ROOT'],
            'baseUrl'  => "//" . $_SERVER['HTTP_HOST'],
            '@web' => App::env('SITE_URL'),
            '@webroot' => App::env('WEB_ROOT_PATH'),
            '@assetUrl' => '@web/assets',
            '@assetPath' => '@webroot/assets',                    
        ),
        'allowUpdates' => (bool)App::env('ALLOW_UPDATES'),
        'allowAdminChanges' => (bool)App::env('ALLOW_ADMIN_CHANGES'),
        'backupOnUpdate' => (bool)App::env('BACKUP_ON_UPDATE'),
        'devMode' => (bool)App::env('DEV_MODE'),
        'enableTemplateCaching' => (bool)App::env('ENABLE_TEMPLATE_CACHING'),
        'isSystemLive' => (bool)App::env('IS_SYSTEM_LIVE'),
        'resourceBasePath' => App::env('WEB_ROOT_PATH').'/cpresources',
        'runQueueAutomatically' => (bool)App::env('RUN_QUEUE_AUTOMATICALLY'),
        'securityKey' => App::env('SECURITY_KEY'),
        'appID' => App::env('APP_ID'),
        'siteUrl' => App::env('SITE_URL'),
        'testToEmailAddress' => (bool)App::env('TEST_TO_EMAIL', false),
        'useEmailAsUsername' => (bool)App::env('EMAIL_TO_USERNAME', true),

        // Craft config settings from constants
		'useProjectConfigFile' => false,
        'sendPoweredByHeader' => false,	// why would anybody do this.. talk about increasing security risks
        'defaultWeekStartDay' => 1,
        'cpTrigger' => 'admin',        
        'cacheDuration' => false,
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],
        'defaultTokenDuration' => 'P2W',
        'enableCsrfProtection' => true,
        'errorTemplatePrefix' => 'errors/',
        'generateTransformsBeforePageLoad' => true,
        'maxCachedCloudImageSize' => 3000,
        'maxUploadFileSize' => '100M',
        'omitScriptNameInUrls' => true,
        'useEmailAsUsername' => true,
        'usePathInfo' => true,    

        'xxxstripePayments' => [
            'testPublishableKey' => getenv('STRIPE_PUBLIC_KEY'),
            'testSecretKey' =>  getenv('STRIP_PRIVATE_KEY'),
            'testMode' => 1,
            // This setting is only needed is Stripe Connect is enabled 
            // 'testClientId' => getenv('YOUR_TEST_CLIENT_ID'),
        ]        
        
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,

        // Prevent crawlers from indexing pages and following links
        'disallowRobots' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Set this to `false` to prevent administrative changes from being made on staging
        'allowAdminChanges' => true,

        // Prevent crawlers from indexing pages and following links
        'disallowRobots' => true,
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on production
        'allowAdminChanges' => true,
    ],
];
