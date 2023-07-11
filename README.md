A Dockerized Sequelize PostgreSQL app that uses the discord api to track messages from the Priceempire channel - https://discord.com/channels/678907553496956939/1092959474303635506. 

The target profile's inventory is then retrieved through the Priceempire API. Data is stored for tracking skin quantities that have been banned/unbanned from the market circulation.

This provides potential market insights into increases/decreases in certain skin prices due to a drop in item quantity (rarity increase).

docker-compose up 

hit
/seed/profiles
/seed/inventories

/counts/all to get all relevant item counts
