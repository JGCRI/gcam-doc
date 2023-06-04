---
layout: index
title: Common Assumptions
prev: diagram.html
next: inputs_demand.html
gcam-version: v7 
---

These assumptions are shared throughout the GCAM model.

## Regional Resolution

### Geopolitical Regions

GCAM subdivides the world into 32 geopolitical regions, representing countries or collections of countries (see Table below).

| GCAM Region	| Countries |
|:-------------:|:---------:|
| Africa\_Eastern	| Burundi, Comoros, Djibouti, Eritrea, Ethiopia, Kenya, Madagascar, Mauritius, Reunion, Rwanda, Sudan, Somalia, Uganda |
| Africa\_Northern | Algeria, Egypt, Western Sahara, Libya, Morocco, Tunisia |
| Africa\_Southern | Angola, Botswana, Lesotho, Mozambique, Malawi, Namibia, Swaziland, Tanzania, Zambia, Zimbabwe |
| Africa\_Western	 | Benin, Burkina Faso, Central African Republic, Cote d’Ivoire, Cameroon, Democratic Republic of the Congo, Congo, Cape Verde, Gabon, Ghana, Guinea, Gambia, Guinea-Bissau, Equatorial Guinea, Liberia, Mali, Mauritania, Niger, Nigeria, Senegal, Sierra Leone, Sao Tome and Principe, Chad, Togo |
| Argentina | Argentina |
| Australia\_NZ	| Australia, New Zealand |
| Brazil | Brazil |
| Canada	    | Canada |
| Central America and the Caribbean	 | Aruba, Anguilla, Netherlands Antilles, Antigua & Barbuda, Bahamas, Belize, Bermuda, Barbados, Costa Rica, Cuba, Cayman Islands, Dominica, Dominican Republic, Guadeloupe, Grenada, Guatemala, Honduras, Haiti, Jamaica, Saint Kitts and Nevis, Saint Lucia, Montserrat, Martinique, Nicaragua, Panama, El Salvador, Trinidad and Tobago, Saint Vincent and the Grenadines |
| Central Asia | Armenia, Azerbaijan, Georgia, Kazakhstan, Kyrgyzstan, Mongolia, Tajikistan, Turkmenistan, Uzbekistan |
| China | China |
| Colombia | Colombia |
| EU-12 | Bulgaria, Cyprus, Czech Republic, Estonia, Hungary, Lithuania, Latvia, Malta, Poland, Romania, Slovakia, Slovenia |
| EU-15         |	Andorra, Austria, Belgium, Denmark, Finland, France, Germany, Greece, Greenland, Ireland, Italy, Luxembourg, Monaco, Netherlands, Portugal, Sweden, Spain, United Kingdom |
| Europe\_Eastern | Belarus, Moldova, Ukraine |
| European Free Trade Association |Iceland, Norway, Switzerland |
| Europe\_Non\_EU | Albania, Bosnia and Herzegovina, Croatia, Macedonia, Montenegro, Serbia, Turkey |
| India | India |
| Indonesia | Indonesia |
| Japan |	Japan |
| Mexico | Mexico |
| Middle East | United Arab Emirates, Bahrain, Iran, Iraq, Israel, Jordan, Kuwait, Lebanon, Oman, Palestine, Qatar, Saudi Arabia, Syria, Yemen |
| Pakistan | Pakistan |
| Russia | Russia |
| South Africa | South Africa |
| South America\_Northern	| French Guiana, Guyana, Suriname, Venezuela |
| South America\_Southern	| Bolivia, Chile, Ecuador, Peru, Paraguay, Uruguay |
| South Asia | Afghanistan, Bangladesh, Bhutan, Sri Lanka, Maldives, Nepal |
| Southeast Asia | American Samoa, Brunei Darussalam, Cocos (Keeling) Islands, Cook Islands, Christmas Island, Fiji, Federated States of Micronesia, Guam, Cambodia, Kiribati, Lao Peoples Democratic Republic, Marshall Islands, Myanmar, Northern Mariana Islands, Malaysia, Mayotte, New Caledonia, Norfolk Island, Niue, Nauru, Pacific Islands Trust Territory, Pitcairn Islands, Philippines, Palau, Papua New Guinea, Democratic Peoples Republic of Korea, French Polynesia, Singapore, Solomon Islands, Seychelles, Thailand, Tokelau, Timor Leste, Tonga, Tuvalu, Viet Nam, Vanuatu, Samoa |
| South Korea | South Korea |
| Taiwan | Taiwan |
| USA | United States |

Table: Mapping from GCAM region to country

### Global River Basins

We have represented the water at the scale of major river basins. Currently 235 global river basins are represented in GCAM. The full list of major river basins included in GCAM is shown in Table 1. Each of the GCAM regions contains the river basins within its border. In many instances, river basins may overlap across multiple GCAM regions where water resources are shared. A few remote basins without water demand representations, such as Antarctica, are not actively modeled.

**Table 1. Major Water Basins in GCAM**
{: .tbl}

|id|name|id|name|id|name|id|name|id|name|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
1|Arctic Ocean Islands|51|Japan|101|Caribbean|151|Lake Chad|201|New Zealand|
2|Northwest Territories|52|Caspian Sea-East Coast|102|Hamun-i-Mashkel|152|Senegal|202|Australia-South Coast
3|Siberia-North Coast|53|Don|103|Taiwan|153|Cauvery|203|Mar Chiquita|
4|Siberia-West Coast|54|Danube|104|Arabian Sea Coast|154|Sri Lanka|204|South Africa-West Coast
5|Kara Sea Coast|55|Adriatic Sea-Greece-Black Sea Coast|105|North Gulf|155|India South Coast|205|Salinas Grandes
6|Lena|56|Ob|106|Yangtze|156|Orinoco|206|La Plata
7|Pacific and Arctic Coast|57|Po|107|Sabarmati|157|Colombia-Ecuador-Pacific Coast|207|North Chile-Pacific Coast
8|Scandinavia-North Coast|58|Amu Darya|108|Xun Jiang|158|Palau and East Indonesia|208|Murray-Darling
9|Russia-Barents Sea Coast|59|Italy-West Coast|109|Hong-Red River|159|North Borneo Coast|209|Pampas Region
10|Mackenzie|60|Spain-Portugal-Atlantic Coast|110|Ganges-Bramaputra|160|Volta|210|North Argentina-South Atlantic Coast
11|Iceland|61|France-South Coast|111|Yucatan Peninsula|161|Northeast South America-South Atlantic Coast|211|Tasmania
12|Sweden|62|Rhone|112|South China Sea Coast|162|Gulf of Guinea|212|South America-Colorado
13|Finland|63	|Mediterranean Sea Islands	|113|Mahi|163|Sumatra|213|Negro
14|Northern Dvina|64|Gironde|114|	Mexico-Interior|164|Sulawesi|214|Central Patagonia Highlands
15|Hudson Bay Coast|65|	North and South Korea|115|Pacific Central Coast|165|Kalimantan|215|South Argentina-South Atlantic Coast
16|Scotland|66|Bo Hai-Korean Bay-North Coast|116|Bay of Bengal-North East Coast|166|Magdalena|216	|Antarctica
17|Neva|67|Spain-South and East Coast|117|Tapti|167|Irian Jaya Coast|217|California River
18|Volga|68|Lake Balkash|118|Yasai|168|Amazon|218|Upper Mississippi
19|Atlantic Ocean Seaboard|69|Tiber|119|Philippines|169|South Chile-Pacific Coast|219|Lower Mississippi River
20|Baltic Sea Coast|70|	Black Sea-South Coast|120|Brahamani|170|Shebelli-Juba|220|Upper Colorado River
21|Denmark-Germany Coast|71|Tagus|121|North Marina Islands and Guam|171|Africa-East Central Coast|221|Lower Colorado River
22|Narva|72|Caspian Sea-South West Coast|122|Mahandi|172|North Brazil-South Atlantic Coast|222	|Great
23|Saskatchewan-Nelson|73|	Ebro|123|Godavari|173|Papua New Guinea Coast|223|Missouri River
24|Ireland|74	|Douro|124|Hainan|174|Tocantins|224|Arkansas White Red
25|Daugava|75	|Mediterranean Sea-East Coast|125|Mekong|175|Java-Timor|225|Texas Gulf Coast
26|England and Wales|76|Syr Darya|126|Viet Nam-Coast|176|Solomon Islands|226|South Atlantic Gulf
27|Fraser|77|Ziya He-Interior|127|Salween|177|Madasgacar|227|Great Lakes
28|Ems-Weser|	78	|China Coast|	128	|India North East Coast|178|Sepik|228|Ohio River
29|Oder|79|Huang He|129	|India West Coast|179|Rift Valley|229|Pacific Northwest
30|Wisla|80|Mediterranean South Coast|130|Papaloapan|180|Peru-Pacific Coast|230|Tennessee River
31|Elbe|81|Guadiana|131	|Rio Lerma|181|Fly|231|Rio Grande River
32|Rhine|82|Central Iran|132|Rio Verde|182|Angola-Coast|232|New England
33|Poland Coast|	83|Guadalquivir|133|Grijalva-Usumacinta|183|Congo|233|Mid Atlantic
34|Churchill|84|Tigris-Euphrates|134|Rio Balsas|184|Australia-North Coast|234|Hawaii
35|Neman|85|Tarim Interior	|135|Southern Central America|185|South Pacific Islands|235|Narmada
36|Scheldt|86|Africa-North West Coast|136|Isthmus of Tehuantepec|186|East Brazil-South Atlantic Coast
37|Russia-South East Coast|87|Nile|137|Irrawaddy|187|Parnaiba
38|Ural|88|Persian Gulf Coast|138|Sittang|188|Zambezi
39|Dnieper|89|Indus|139	|Peninsula Malaysia|189|Australia-East Coast
40|St Lawrence|90|Farahrud|140|Krishna|190|Africa-Indian Ocean Coast
41|France-West Coast|91|Baja California|141|Andaman-Nicobar Islands|191|Australia-West Coast
42|Gobi Interior|92|Plateau of Tibet Interior|142|Africa-West Coast|192|Sao Francisco 
43|Amur|93|Red Sea-East Coast|143|Caribbean Coast|193|Australia-Interior 
44|Loire|94|Arabian Peninsula|144|Africa-North Interior|194|Orange
45|Caspian Sea Coast|95|Dead Sea|145|India East Coast|195|Uruguay-Brazil-South Atlantic Coast
46|Seine|96|Mexico-Northwest Coast|146|Chao Phraya|196|Namibia-Coast
47|Black Sea-North Coast|97|Helmand|147|Pennar|197|Africa-South Interior
48|Yenisey|98|Sinai Peninsula|148|Gulf of Thailand Coast|198|South Africa-South Coast
49|Dniester|99|Eastern Jordan-Syria|149|Niger|199|Limpopo
50|Italy-East Coast|100	|Africa-Red Sea-Gulf of Aden Coast|150|Micronesia|200|La Puna Region

<br/>

### Global Land Units

For GCAM3.0 through GCAM4.4, the Agriculture and Land Use model subdivided the GCAM geopolitical regions into as many as 18 climatically defined agro-ecological zones (AEZs) developed by the GTAP group. GCAM5+ switches subregions to water basin-defined geographic land units (GLUs). The land data system files are produced by the [Moirai](https://github.com/JGCRI/moirai), described in Di Vittorio et al. (2016). 


## Temporal Resolution

### Historical Years

The GCAM data system can produce such data sets annually beginning in 1971. Currently, GCAM uses data from 1990, 2005, 2010, and 2015 to initialize the model, but could be initialized to any year beginning in 1971.

### Future Years

Currently, GCAM models the future from 2020 to 2100 in 5 year time steps. The time step is variable and can be changed in [the data system](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R). 

## Economic Choice

GCAM represents choices among options using a logit function. For more information on economic choice, see [choice](choice.html).
