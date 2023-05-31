<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.10.1" name="Objects" tilewidth="16" tileheight="20" tilecount="8" columns="0" objectalignment="bottom">
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="1">
  <image width="16" height="20" source="../objects/MetalDoor.png"/>
 </tile>
 <tile id="2">
  <properties>
   <property name="resource" value="Screwdriver"/>
  </properties>
  <image width="8" height="8" source="../objects/Screwdriver.png"/>
 </tile>
 <tile id="3">
  <properties>
   <property name="resource" value="Batteries"/>
  </properties>
  <image width="8" height="8" source="../objects/Batteries.png"/>
 </tile>
 <tile id="4">
  <properties>
   <property name="resource" value="Gear"/>
  </properties>
  <image width="8" height="8" source="../objects/Gear.png"/>
 </tile>
 <tile id="5">
  <properties>
   <property name="resource" value="Key"/>
  </properties>
  <image width="8" height="8" source="../objects/Key.png"/>
 </tile>
 <tile id="6">
  <image width="12" height="11" source="../objects/Goal.png"/>
 </tile>
 <tile id="9">
  <properties>
   <property name="resource" value="LeverLeft"/>
   <property name="target" type="object" value="0"/>
  </properties>
  <image width="10" height="12" source="../objects/LeverLeft.png"/>
 </tile>
 <tile id="10">
  <properties>
   <property name="resource" value="LeverRight"/>
   <property name="target" type="object" value="0"/>
  </properties>
  <image width="10" height="12" source="../objects/LeverRight.png"/>
 </tile>
</tileset>
