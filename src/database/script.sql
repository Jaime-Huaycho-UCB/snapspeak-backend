DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

create table users(
	id_user Serial,
	username varchar(30) not null,
	password varchar(255) not null,
	primary key (id_user)
);

create table languages(
	id_language Serial,
	code int not null,
	name varchar(50),
	primary key (id_language)
);

create table dictionary(
	id_word bigserial,
	word varchar(50) not null,
	id_language int not null,
	translated varchar(70) not null,
	primary key (id_word),
	foreign key (id_language) references languages(id_language)
);

create table user_vocabularies(
	id_vocabulary bigint,
	id_user int not null,
	id_word int not null,
	image_url varchar(500) not null,
	primary key (id_vocabulary),
	foreign key (id_user) references users(id_user),
	foreign key (id_word) references dictionary(id_word)
);