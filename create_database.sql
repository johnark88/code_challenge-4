-- Database name
--sweetTreats

--create TABLE
CREATE TABLE treat  (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	description TEXT,
	pic VARCHAR (2000)
);
--sample Insert
INSERT INTO treat (name,description, pic) VALUES ( 'Oreo Malt', 'delicious milkshake' ,'http://images.sweetauthoring.com/recipe/53860_977.jpg' );
