CREATE TABLE League (
	Year INTEGER,
	Name CHAR(20),
	Host_Country CHAR(20),
	PRIMARY KEY (Year, Name)
);

CREATE TABLE Referee_ID (
	Name	CHAR(20),
	R_ID INTEGER,
	Year_of_Experience INTEGER,
	PRIMARY KEY (R_ID)
);

CREATE TABLE Referee_YOE (
	Year_of_Experience INTEGER,
	Salary		   INTEGER,
	PRIMARY KEY (Year_of_Experience)
);

CREATE TABLE  Match_Contians_Officiates_Time (
	Time INTEGER,
	Venue CHAR(20),
	Score CHAR(10),
	R_ID INTEGER NOT NULL,
	Year INTEGER NOT NULL,
	Name CHAR(10) NOT NULL,
	PRIMARY KEY (Time, Venue),
	FOREIGN KEY (R_ID) REFERENCES Referee_ID(R_ID), 
	FOREIGN KEY (Year, Name) REFERENCES League(Year, Name)
);
	
CREATE TABLE Match_Contians_Officiates_Venue (
	Venue CHAR(20), 
	TicketPrice INTEGER,
	PRIMARY KEY (Venue)
);

CREATE TABLE League_Has (
	L_Year INTEGER,
	L_Name CHAR(20),
	S_Brand_name CHAR(20),
	PRIMARY KEY (L_Year, L_name, S_Brand_name),
	FOREIGN KEY (L_Year, L_name) REFERENCES League (Year, Name),
	FOREIGN KEY (S_Brand_name) REFERENCES Sponsor (Brand_name) ON DELETE CASCADE
);

CREATE TABLE Sponsor (
	Brand_name CHAR(20),
	Type CHAR(20),
	Amount INTEGER,
	PRIMARY KEY (Brand_name)
);

CREATE TABLE Team (
	Team_name CHAR(20),
	Country CHAR(20),
	PRIMARY KEY (Team_name)
);

CREATE TABLE Compete (
  match_time INTEGER,
  match_venue CHAR(20),
  team1_name CHAR(20),
  team2_name CHAR(20),
  FOREIGN KEY (match_time, match_venue) REFERENCES Match_Contians_Officiates_Time(time, venue),
  FOREIGN KEY (team1_name) REFERENCES Team(Team_name),
  FOREIGN KEY (team2_name) REFERENCES Team(Team_name),
  PRIMARY KEY (match_time,match_venue,team1_name,team2_name)
);

CREATE TABLE participates (
	league_year INTEGER,
	league_name CHAR(20),
	team_name CHAR(20),
	FOREIGN KEY (league_year, league_name) REFERENCES League(Year, Name),
	FOREIGN KEY (team_name) REFERENCES Team(Team_name),
	PRIMARY KEY (league_year, league_name, team_name)
);

CREATE TABLE Sponsor_Sponses(
	T_Name CHAR(20),
	S_Brand_name CHAR(20),
	PRIMARY KEY (T_Name, S_Brand_name),
	FOREIGN KEY (T_Name) REFERENCES Team(Team_name),
	FOREIGN KEY (S_Brand_name) REFERENCES Sponsor(Brand_name) ON DELETE CASCADE
);

CREATE TABLE Therapist_Has (
	ID INTEGER,
	T_NAME CHAR(20),
	Name CHAR(20),
	Salary INTEGER,
	PRIMARY KEY(ID),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);

CREATE TABLE Coach_Associate_with (
	Coach_ID CHAR(20),
	Name CHAR(20),
	Salary INTEGER,
	Age INTEGER,
	T_NAME CHAR(20),
	PRIMARY KEY(Coach_ID),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);

CREATE TABLE Goalkeeper (
	Name CHAR(20),
	Jersey_Number INTEGER,
	Saving_Skill INTEGER,
	Salary INTEGER,
	T_NAME CHAR(20) NOT NULL,
	PRIMARY KEY(Name, Jersey_Number, T_NAME),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);

CREATE TABLE Defender (
	Name CHAR(20),
	Jersey_Number INTEGER,
	Defensive_Skill INTEGER,
	Salary INTEGER,
	T_NAME CHAR(20) NOT NULL,
	PRIMARY KEY(Name, Jersey_Number, T_NAME),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);

CREATE TABLE Midfielder (
	Name CHAR(20),
	Jersey_Number INTEGER,
	Striking_Skill INTEGER,
	Salary INTEGER,
	T_NAME CHAR(20) NOT NULL,
	PRIMARY KEY(Name, Jersey_Number, T_NAME),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);

CREATE TABLE Forward (
	Name CHAR(20),
	Jersey_Number INTEGER,
	Shooting_Skill INTEGER,
	Salary INTEGER,
	T_NAME CHAR(20) NOT NULL,
	PRIMARY KEY(Name, Jersey_Number, T_NAME),
	FOREIGN KEY(T_NAME) REFERENCES Team(Team_name)
);


INSERT INTO League VALUES (2020, 'Fun League', 'Portugal');

INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Szymon Marciniak', 1, 10);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Paweł Sokolnicki', 2, 8);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Tomasz Listkiewicz', 3, 6);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Carlos Velasco Carballo', 4, 4);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Tomasz Kwiatkowski', 6, 4);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Bartosz Frankowski', 7, 2);
INSERT INTO Referee_ID (Name, R_ID, Year_of_Experience) VALUES ('Marco Fritz', 8, 2);

INSERT INTO Referee_YOE VALUES (10, 100000);
INSERT INTO Referee_YOE VALUES (8, 90000);
INSERT INTO Referee_YOE VALUES (6, 80000);
INSERT INTO Referee_YOE VALUES (4, 70000);
INSERT INTO Referee_YOE VALUES (2, 50000);

INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200618, 'Main Stadium', '2-1', 1, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200618, 'Stadium 2', '1-0', 2, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200618, 'Stadium 3', '3-2', 3, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200620, 'Main Stadium', '0-2', 4, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200620, 'Stadium 2', '4-2', 1, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200620, 'Stadium 3', '1-2', 2, 2020, 'Fun League');
INSERT INTO Match_Contians_Officiates_Time (Time, Venue, Score, R_ID, Year, Name) 
VALUES (20200622, 'Main Stadium', '3-2', 3, 2020, 'Fun League');

INSERT INTO Match_Contians_Officiates_Venue (Venue, TicketPrice)
VALUES ('Main Stadium', 100);
INSERT INTO Match_Contians_Officiates_Venue (Venue, TicketPrice)
VALUES ('Stadium 2', 80);
INSERT INTO Match_Contians_Officiates_Venue (Venue, TicketPrice)
VALUES ('Stadium 3', 70);

INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Nike', 'Sportswear', 20000000);
INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Adidas', 'Sportswear', 15000000);
INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Asics', 'Sportswear', 10000000);
INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Yonex', 'Sportswear', 22000000);
INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Coca_Cola', 'Sportswear', 10000000);
INSERT INTO Sponsor (Brand_name, Type, Amount) 
VALUES ('Red_bull', 'Sportswear', 100000000);

INSERT INTO League_Has (L_Year, L_Name, S_Brand_name) 
VALUES (2020, 'Fun League', 'Nike');
INSERT INTO League_Has (L_Year, L_Name, S_Brand_name) 
VALUES (2020, 'Fun League', 'Adidas');
INSERT INTO League_Has (L_Year, L_Name, S_Brand_name) 
VALUES (2020, 'Fun League', 'Red_bull');
INSERT INTO League_Has (L_Year, L_Name, S_Brand_name) 
VALUES (2020, 'Fun League', 'Asics');

INSERT INTO Team VALUES ('Paris Saint-Germain', 'France');
INSERT INTO Team VALUES ('RB Leipzig', 'Germany');
INSERT INTO Team VALUES ('Bayern Munich', 'Germany');
INSERT INTO Team VALUES ('Lyon', 'France');
INSERT INTO Team VALUES ('Atalanta', 'Italy');
INSERT INTO Team VALUES ('Atletico Madrid', 'Spain');
INSERT INTO Team VALUES ('Barcelona', 'Spain');
INSERT INTO Team VALUES ('Manchester City', 'England');

INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Paris Saint-Germain', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Paris Saint-Germain', 'Yonex');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('RB Leipzig', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('RB Leipzig', 'Coca_Cola');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Bayern Munich', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Lyon', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Atalanta', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Atletico Madrid', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Barcelona', 'Nike');
INSERT INTO Sponsor_Sponses (T_Name, S_Brand_name) 
VALUES ('Manchester City', 'Nike');

INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Paris Saint-Germain');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'RB Leipzig');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Bayern Munich');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Lyon');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Atalanta');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Atletico Madrid');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Barcelona');
INSERT INTO participates (league_year, league_name, team_name)
VALUES (2020, 'Fun League', 'Manchester City');

INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (1, 'Paris Saint-Germain', 'Jacques Dupont', 80000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (2, 'RB Leipzig', 'Heinz Schmidt', 75000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (3, 'Bayern Munich', 'Fritz Müller', 82000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (4, 'Lyon', 'Henri Leclerc', 73000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (5, 'Atalanta', 'Giovanni Rossi', 79000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (6, 'Atletico Madrid', 'Carlos Garcia', 85000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (7, 'Barcelona', 'Jose Martinez', 89000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (8, 'Manchester City', 'John Smith', 87000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (9, 'RB Leipzig', 'Max Klein', 76000);
INSERT INTO Therapist_Has (ID, T_NAME, Name, Salary)
VALUES (10, 'Paris Saint-Germain', 'Pierre Moreau', 81000);

INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach1', 'Jean-Luc Martin', 120000, 45, 'Paris Saint-Germain');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach2', 'Ludwig Weber', 125000, 45, 'RB Leipzig');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach3', 'Karl Fischer', 130000, 45, 'Bayern Munich');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach4', 'Louis Bernard', 115000, 48, 'Lyon');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach5', 'Marco Bianchi', 135000, 48, 'Atalanta');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach6', 'Francisco Perez', 140000, 50, 'Atletico Madrid');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach7', 'Miguel Lopez', 150000, 50, 'Barcelona');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach8', 'Richard Johnson', 145000, 52, 'Manchester City');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach9', 'Johannes Wagner', 125000, 40, 'RB Leipzig');
INSERT INTO Coach_Associate_with (Coach_ID, Name, Salary, Age, T_NAME)
VALUES ('Coach10', 'Paul Dubois', 120000, 38, 'Paris Saint-Germain');

INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Neymar', 10, 95, 300000, 'Paris Saint-Germain');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Kylian Mbappe', 7, 95, 275000, 'Paris Saint-Germain');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Timo Werner', 11, 85, 200000, 'RB Leipzig');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Yussuf Poulsen', 9, 83, 180000, 'RB Leipzig');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Robert Lewandowski', 9, 95, 290000, 'Bayern Munich');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Serge Gnabry', 22, 85, 220000, 'Bayern Munich');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Memphis Depay', 10, 85, 190000, 'Lyon');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Karl Toko Ekambi', 7, 81, 175000, 'Lyon');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Duvan Zapata', 91, 84, 210000, 'Atalanta');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Luis Muriel', 9, 82, 200000, 'Atalanta');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Luis Suarez', 9, 90, 250000, 'Atletico Madrid');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Joao Felix', 7, 83, 225000, 'Atletico Madrid');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Lionel Messi', 10, 98, 325000, 'Barcelona');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Antoine Griezmann', 7, 88, 240000, 'Barcelona');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Sergio Aguero', 10, 90, 275000, 'Manchester City');
INSERT INTO Forward (Name, Jersey_Number, Shooting_Skill, Salary, T_NAME)
VALUES ('Gabriel Jesus', 9, 84, 225000, 'Manchester City');

INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Paul Pogba', 6, 85, 150000, 'Paris Saint-Germain');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Julian Draxler', 23, 80, 120000, 'Paris Saint-Germain');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Marcel Sabitzer', 7, 80, 120000, 'RB Leipzig');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Dani Olmo', 25, 82, 130000, 'RB Leipzig');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Joshua Kimmich', 6, 88, 180000, 'Bayern Munich');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Leon Goretzka', 18, 85, 160000, 'Bayern Munich');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Houssem Aouar', 8, 81, 120000, 'Lyon');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Bruno Guimaraes', 39, 79, 110000, 'Lyon');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Marten de Roon', 15, 78, 100000, 'Atalanta');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Remo Freuler', 11, 77, 100000, 'Atalanta');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Koke', 6, 85, 150000, 'Atletico Madrid');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Marcos Llorente', 14, 84, 140000, 'Atletico Madrid');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Frenkie de Jong', 21, 87, 160000, 'Barcelona');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Pedri', 16, 86, 150000, 'Barcelona');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Kevin De Bruyne', 17, 91, 200000, 'Manchester City');
INSERT INTO Midfielder (Name, Jersey_Number, Striking_Skill, Salary, T_NAME) VALUES ('Ilkay Gundogan', 8, 85, 140000, 'Manchester City');

INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Thiago Silva', 2, 85, 80000, 'Paris Saint-Germain');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Marquinhos', 5, 87, 90000, 'Paris Saint-Germain');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Lukas Klostermann', 16, 82, 75000, 'RB Leipzig');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Dayot Upamecano', 5, 84, 80000, 'RB Leipzig');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Niklas Süle', 4, 88, 85000, 'Bayern Munich');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Jerome Boateng', 17, 90, 95000, 'Bayern Munich');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Jason Denayer', 5, 80, 70000, 'Lyon');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Marcelo', 6, 82, 75000, 'Lyon');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Rafael Toloi', 2, 81, 72000, 'Atalanta');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Cristian Romero', 17, 83, 77000, 'Atalanta');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Stefan Savic', 15, 86, 83000, 'Atletico Madrid');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Felipe', 18, 88, 88000, 'Atletico Madrid');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Gerard Piqué', 3, 87, 86000, 'Barcelona');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Clement Lenglet', 15, 89, 91000, 'Barcelona');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('Aymeric Laporte', 14, 89, 88000, 'Manchester City');
INSERT INTO Defender (Name, Jersey_Number, Defensive_Skill, Salary, T_NAME) 
VALUES ('John Stones', 5, 91, 93000, 'Manchester City');

INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Keylor Navas', 1, 87, 85000, 'Paris Saint-Germain');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Péter Gulácsi', 1, 85, 80000, 'RB Leipzig');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Manuel Neuer', 1, 90, 90000, 'Bayern Munich');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Anthony Lopes', 1, 84, 78000, 'Lyon');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Pierluigi Gollini', 95, 82, 76000, 'Atalanta');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Jan Oblak', 13, 91, 92000, 'Atletico Madrid');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Marc-André ter Stegen', 1, 90, 90000, 'Barcelona');
INSERT INTO Goalkeeper (Name, Jersey_Number, Saving_Skill, Salary, T_NAME) 
VALUES ('Ederson', 31, 88, 87000, 'Manchester City');


INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200618, 'Main Stadium', 'Paris Saint-Germain', 'RB Leipzig');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200618, 'Stadium 2', 'Bayern Munich', 'Lyon');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200618, 'Stadium 3', 'Atalanta', 'Atletico Madrid');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200620, 'Main Stadium', 'Barcelona', 'Manchester City');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200620, 'Stadium 2', 'Paris Saint-Germain', 'Bayern Munich');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200620, 'Stadium 3', 'Atalanta', 'Manchester City');
INSERT INTO Compete (match_time, match_venue, team1_name, team2_name)
VALUES (20200622, 'Main Stadium', 'Paris Saint-Germain', 'Manchester City');
