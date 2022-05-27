USE myDB;
CREATE TABLE Images
(
    imageID int AUTO_INCREMENT,
    title varchar(15),
    viewCount int DEFAULT 0,
    PRIMARY KEY(ImageID)
);

CREATE TABLE Comments
(
    belongsTo int,
    username varchar(20),
    comment varchar(140) 
);

CREATE Table Users
(
    username varchar(20),
    pwd varchar(20)
)