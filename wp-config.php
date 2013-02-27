<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur 
 * {@link http://codex.wordpress.org/Editing_wp-config.php Modifier
 * wp-config.php} (en anglais). C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'wp_gallerie_epop');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8');

/** Type de collation de la base de données. 
  * N'y touchez que si vous savez ce que vous faites. 
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant 
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '+(*.#F(Ri-Aw+}0#0nPK*i0sCCg]>prfvud:LB0nzl5a[/Bxz>Rv3 )SYMAMgHNz');
define('SECURE_AUTH_KEY',  '6g[1%pv[=zT^~ 3v+I$`v$hF2`>@<FBYt0298_!.@}pq5q~FFDx4*[6]>GZK1+wG');
define('LOGGED_IN_KEY',    'PIgr(g@=N`9~brkQ?JG| 41UZ~q<4Thlt .nB^EkLYOy:*=Z,q%RCeLWcym,jqyC');
define('NONCE_KEY',        'uR*1@Fc2V(:)rrG_MuSKMn{yatxZJQM#.-g>MaZ5?@-F:as+#5uKMT]HS;~QkGw.');
define('AUTH_SALT',        'i<cn2))C!/_!|aV-Bl$k9t%,wZSrQ@fFg-V, Ty5Tdw7t~/er,5i9p}AZ2h7+%41');
define('SECURE_AUTH_SALT', '|g+e81?`D8q+Ar2<>rjJa;PO 3P+M{00SP?>MNY|hl Lb?~)P2/*<_<YaX>l,L5O');
define('LOGGED_IN_SALT',   'G~{!vw&4m[&--qsE^NE37IRkG)f*En]qNekKZh&;9 )?_@7Mu}n(/zt|}]Tk+;M_');
define('NONCE_SALT',       ';|X$xcFS~c>oz3ug-W^9VtA?&rXG=!0M}5RI=SAKf{&k{*Pc:@y9BX)jV@Z;?WhZ');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique. 
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/**
 * Langue de localisation de WordPress, par défaut en Anglais.
 *
 * Modifiez cette valeur pour localiser WordPress. Un fichier MO correspondant
 * au langage choisi doit être installé dans le dossier wp-content/languages.
 * Par exemple, pour mettre en place une traduction française, mettez le fichier
 * fr_FR.mo dans wp-content/languages, et réglez l'option ci-dessous à "fr_FR".
 */
define('WPLANG', 'fr_FR');

/** 
 * Pour les développeurs : le mode deboguage de WordPress.
 * 
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant votre essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de 
 * développement.
 */ 
define('WP_DEBUG', false); 

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');