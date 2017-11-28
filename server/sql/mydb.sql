drop tables if exists t_accounts;
create table t_accounts(
    account varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);
insert into t_accounts
value('10000', '20000');