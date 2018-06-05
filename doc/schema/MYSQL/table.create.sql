CREATE TABLE `honorship` (
  `honorship_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_code` varchar(20) NOT NULL DEFAULT 'Missing CODE',
  `course_code` varchar(20) NOT NULL DEFAULT 'Missing CODE',
  `title` varchar(50) NOT NULL DEFAULT 'Missing TITLE',
  `credit` int(2) NOT NULL DEFAULT '5',
  `level` varchar(10) NOT NULL DEFAULT 'Missing',
  `group` varchar(10) NOT NULL DEFAULT '[b]',
  `status` int(2) NOT NULL DEFAULT '1',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_udpate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`honorship_id`),
  UNIQUE KEY `program_code` (`program_code`,`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `healthcheck` (
  `healthcheck_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL DEFAULT '',
  `site_uri` varchar(255) NOT NULL,
  `test_uri` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '1',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_udpate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`healthcheck_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `countdown` (
  `countdown_id` int(11) NOT NULL AUTO_INCREMENT,
  `issue` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL DEFAULT '',
  `status` int(2) NOT NULL DEFAULT '1',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_udpate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`countdown_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;