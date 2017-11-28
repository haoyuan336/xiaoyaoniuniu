drop tables if exists t_accounts;
create table t_accounts(
    account varchar(255) NOT NULL,
    password varchar(255) NOT NULL
)DEFAULT CHARSET=utf8;
drop tables if exists t_userinfo;
create table t_userinfo(
    account varchar(255) not null,
    nickname varchar(255) not null,
    headimage varchar(255) not null
)DEFAULT CHARSET=utf8;
insert into t_userinfo value("10000", "小明", "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png");

