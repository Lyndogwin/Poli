Drop table if exists politicians;
create table politicians (
	FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Age int NOT NULL,
    Current_Position varchar(255) default NULL,
    Running_Position varchar(255) NOT NULL,
    Incumbent bool NOT NULL,
    Party varchar(255) 
);

Insert into politicians (FirstName, LastName, Age, Current_Position, Running_Position, Incumbent, Party)
Values ("Donald" ,"Trump", 74, "President", "President", true, "Republican"), 
("Joe", "Biden", 77, "N/A", "President", false, "Democrat"),
("Thom", "Tillis", 60, "Senator", "Senator", true, "Republican"),
("Cal", "Cunningham", 47, "N/A", "Senator", false, "Democrat"),
("G.K", "Butterfield", 73, "Representative", "House of Representatives: District 1", true, "Democrat"),
("Sandy", "Smith", 37, "N/A", "House of Representatives: District 1", false, "Republican")
;