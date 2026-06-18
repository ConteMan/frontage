#!/usr/bin/env bash
# Legacy Bash wrapper for the cross-platform Node.js update check.
# Silent when Node is unavailable. Kept for older instructions or manual use.

set +e

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" 2>/dev/null && pwd )"
[ -z "$script_dir" ] && exit 0
command -v node >/dev/null 2>&1 || exit 0
node "${script_dir}/check-update.mjs" 2>/dev/null

exit 0
