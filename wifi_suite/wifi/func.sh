#!/bin/bash

while true
do

  change=`diff file1 file2`

  if [ -n "$change" ] 
  then

   cp file1 file2
   ssid=""
   p=""
   input="./file2"
   ssid=`cat './file2' | cut -d " " -f1`
   p=`cat './file2' | cut -d " " -f2`

   echo "Changement de wifi $ssid et $p"

   echo -e "network={\n   ssid=$ssid\n   psk=$p\n   key_mgmt=WPA-PSK\n}" >>/etc/wpa_supplicant/wpa_supplicant.conf
   sudo reboot
  fi

done
