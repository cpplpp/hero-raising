# Hero Raising

Place where you can raise your Hero

## Installation

install dependencies

```bash 
npm i
```
create your database

```bash
npm run create-schema
```

## Usage

create hero 

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Name", "strength":10, "dexterity":10, "intelligence":10, "isInvincible":true}' localhost:5000/hero/createHero
```

update hero stats

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"strength":11, "dexterity":11, "intelligence":8, "isInvincible":true}' localhost:5000/hero/:name/setHeroStats
```

set hero image

```bash
curl -X POST -F 'heroImage=@<PATH>' localhost:5000/hero/:name/uploadHeroImage       
```

get all geroes

```bash
curl localhost:5000/hero/getAllHeroes
```

get hero stats

```bash
curl localhost:5000/hero/:name/getHeroStats
```

download hero image

```bash
curl --output <PATH> localhost:5000/hero/Pipper/getHeroImage
```

