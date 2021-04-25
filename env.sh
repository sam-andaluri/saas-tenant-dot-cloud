#!/bin/bash

# Recreate config file
export CONFIG_FILE=./public/env-config.js
export ENV_FILE=/tmp/envs/.env
rm -rf $CONFIG_FILE
touch $CONFIG_FILE

# Add assignment 
echo "window._env_ = {" >> $CONFIG_FILE

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> $CONFIG_FILE
done < $ENV_FILE

echo "}" >> $CONFIG_FILE
