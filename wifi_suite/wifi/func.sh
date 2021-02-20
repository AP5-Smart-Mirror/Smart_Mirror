#!/bin/bash

while true
do

  change=`diff file1 file2`

  if [ -n "$change" ] 
  then

   cp file1 file2
   ssid=""
   pswd=""
   input="./file2"
   ssid=`cat './file2' | cut -d " " -f1`
   pswd=`cat './file2' | cut -d " " -f2`

   echo "Changement de wifi $ssid"

   echo -e "network={\n   ssid=$ssid\n   psk=$pswd\n   key_mgmt=WPA-PSK\n}" >> sortie

  fi

done
