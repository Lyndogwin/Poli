Drop table if exists policies;
create table policies (
	ID int NOT NULL auto_increment,
    Policy text,
    PRIMARY KEY (ID)
);

INSERT into policies (Policy)
values ("Build a wall with Mexico"), ("Get Covid-19 under control"), ("Free College")