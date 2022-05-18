USE myDB;
CREATE TABLE Images
(
    imageID int AUTO_INCREMENT,
    title varchar(15),
    viewCount int,
    PRIMARY KEY(ImageID)
);

CREATE TABLE Comments
(
    belongsTo int,
    comment varchar(140) 
);

CREATE Table Users
(
    username varchar(20),
    pwd varchar(20)
)