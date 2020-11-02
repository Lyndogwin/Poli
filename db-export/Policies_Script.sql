Drop table if exists policies;
create table policies (
	ID int NOT NULL auto_increment,
    Policy text,
    PRIMARY KEY (ID)
);

INSERT into policies (Policy)
values ("Build a wall with Mexico"), ("Get Covid-19 under control"), ("Free College"),("Legalize Marijuana"),
("Pro Gay Marriage"),("Anti Gay Marriage"),("Pro Abortion"),("Anti Abortion"),("Pro Confederate Flag"),("Anti Confederate Flag"),
("Pro Death Penalty"),("Anti Death Penalty"),("Pro Gun COntrol"),("Anti Gun COntrol"),("Pro Gerrymandering"),("Anti Gerrymandering"),("Pro Net Nutrality"),("Anti Net Nutrality"),
("Pro Immunity for Edward Snowden"),("Anti Immunity for Edward Snowden"),("Pro Obamacare"),("Anti Obamacare"),("Let States decide minimum wage"),("$15 Federal Minimum Wage"),("Supports Corporate Taxes")
,("Pro COrporate Tax Breaks")