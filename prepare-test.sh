#!/usr/bin/env bash

if [ "$(uname)" = 'Darwin' ]; then
  OS='darwin'
elif [ "$(expr substr $(uname -s) 1 5)" = 'Linux' ]; then
  OS='linux'
elif [ "$(expr substr $(uname -s) 1 10)" = 'MINGW64_NT' ]; then                                                                                           
  OS='win32'
else
  echo "Your platform ($(uname -a)) is not supported."
  exit 1
fi

VUE='Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg'
VUE3='Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/10.0_1'

if [ ${OS} = 'darwin' ]; then
  mkdir -p ~/Library/Application\ Support/Google/Chrome/${VUE}
  mkdir -p ~/Library/Application\ Support/Google/Chrome/${VUE3}
elif [ ${OS} = 'linux' ]; then
  mkdir -p ~/.config/google-chrome/${VUE}
  mkdir -p ~/.config/google-chrome/${VUE3}
elif [ ${OS} = 'win32' ]; then
  mkdir -p ~/AppData/Local/Google/Chrome/User\ Data/${VUE}
  mkdir -p ~/AppData/Local/Google/Chrome/User\ Data/${VUE3}
else
  echo "Your platform ($(uname -a)) is not supported."
  exit 1
fi