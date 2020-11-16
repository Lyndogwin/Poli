Drop table if exists ppj;
create table ppj(
	policy_id int NOT NULL,
    politician_id int NOT NULL,
    CONSTRAINT PK_ppj PRIMARY KEY
    (
        policy_id,
        politician_id
    ),
    FOREIGN KEY (policy_id) REFERENCES policies (id),
    FOREIGN KEY (politician_id) REFERENCES politicians (id) 
);