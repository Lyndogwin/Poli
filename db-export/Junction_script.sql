Drop table if exists policies_politician_junction;
create table policies_politician_junction(
	policy_id int,
    politician_id int,
    CONSTRAINT pol_junc_pk PRIMARY KEY (policy_id, politician_id),
    /*CONSTRAINT FK_Policy */
        FOREIGN KEY (policy_id) REFERENCES policies (policy_id),
    /*CONSTRAINT FK_Politician*/
        FOREIGN KEY (politician_id) REFERENCES politicians (politician_id)
);