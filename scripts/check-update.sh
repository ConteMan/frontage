#!/usr/bin/env bash
# Non-blocking update check for frontage.
#
# Reads the local VERSION file, fetches the upstream VERSION from GitHub at
# most once per day, and prints a single line if a newer version is available.
# Silent on success / no-op / offline / missing curl / sandboxed environments.
# This script MUST NEVER block or fail the caller — exit 0 in every error path.

set +e

repo="ConteMan/frontage"
upstream_url="https://raw.githubusercontent.com/${repo}/main/VERSION"

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" 2>/dev/null && pwd )"
[ -z "$script_dir" ] && exit 0
local_version_file="${script_dir}/../VERSION"

[ -f "$local_version_file" ] || exit 0
local_version="$(tr -d '[:space:]' < "$local_version_file" 2>/dev/null)"
[ -z "$local_version" ] && exit 0

# Throttle to once per day.
state_dir="${XDG_STATE_HOME:-$HOME/.local/state}/frontage"
mkdir -p "$state_dir" 2>/dev/null
stamp_file="$state_dir/last-check"
now="$(date +%s 2>/dev/null)"
[ -z "$now" ] && exit 0
if [ -f "$stamp_file" ]; then
  last="$(cat "$stamp_file" 2>/dev/null)"
  if [ -n "$last" ] && [ "$((now - last))" -lt 86400 ]; then
    exit 0
  fi
fi
echo "$now" > "$stamp_file" 2>/dev/null

command -v curl >/dev/null 2>&1 || exit 0

remote_version="$(curl --silent --max-time 4 --fail "$upstream_url" 2>/dev/null | tr -d '[:space:]')"
[ -z "$remote_version" ] && exit 0

if [ "$remote_version" != "$local_version" ]; then
  echo "frontage update available: ${local_version} -> ${remote_version} (https://github.com/${repo}/releases/latest)"
fi

exit 0
